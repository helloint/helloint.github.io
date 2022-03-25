import argparse
import json
import datetime
import re
from jinja2 import Environment, FileSystemLoader
import requests
from lxml import etree

headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"}

'''
这波疫情是从3/1开始的， 但3/6之前的报告里没有公布地址。
0301 (1/1)  http://wsjkw.sh.gov.cn/xwfb/20220302/e0c9d63937ed4cfba163c3c97ae05e1d.html
    该病例，女，56岁，本市户籍， 2月28日因发热等症状前往医院发热门诊就诊，新冠病毒核酸检测结果异常。
0302 (3/5)  http://wsjkw.sh.gov.cn/xwfb/20220303/c44474f0577a4e829896aadf668045b7.html
0303 (2/14) http://wsjkw.sh.gov.cn/xwfb/20220304/164e0c9e7efe41fd91d6eb9e10967cdb.html
0304 (3/16) http://wsjkw.sh.gov.cn/xwfb/20220305/1fd23e48cc4f479ea8fc56c9e1052759.html
0305 (0/28) http://wsjkw.sh.gov.cn/xwfb/20220306/ce44bea5ad8e41bf85165cdf35c84bdb.html
'''


def extract_addresses(url):
    """
    从url中提取地址信息，支持多种不同文本格式
    :param url:
    :return: 地址数组
    """
    addresses = []
    r = requests.get(url, headers=headers, verify=False)
    content = r.content.decode("utf-8")
    html = etree.HTML(content)
    # 微信公众号
    title = html.xpath('//h1[@id="activity-name"]/text()')
    if not title:
        title = html.xpath('//h2[@id="ivs_title"]/text()')
    title = title[0]
    m = re.match(r'上海2022年(\d+)月(\d+)日', title)
    if not m:
        m = re.match(r'(\d+)月(\d+)日（0-24时）', title)
    mon = int(m.group(1))
    date = int(m.group(2))
    dt = datetime.date(2022, mon, date)
    if dt >= datetime.date(2022, 3, 18):
        addresses = extract_addresses3(url)
    elif dt >= datetime.date(2022, 3, 8):
        addresses = extract_addresses2(url)
    elif dt >= datetime.date(2022, 3, 6):
        addresses = extract_addresses1(url)
    # 3/6之前没有公布地址
    return addresses


def extract_addresses1(url):
    """
    模版1(3/6+):
        title: 上海2022年3月6日，新增本土新冠肺炎确诊病例3例 新增本土无症状感染者45例
        regex: 居住地为(\S+?)，|。
        sample: http://wsjkw.sh.gov.cn/xwfb/20220307/6490dbd707674b278f40159595aa5cd9.html
    """
    r = requests.get(url, headers=headers, verify=False)
    content = r.content.decode("utf-8")
    texts = re.findall(r'居住地为(\S+?)，|。', content, re.MULTILINE)
    addresses = list(filter(lambda x: x!="", texts))
    return list(set(addresses))


def extract_addresses2(url):
    """
    模版2(3/8+):
        title: 上海2022年3月8日，新增本土新冠肺炎确诊病例3例 新增本土无症状感染者62例
        regex: 居住于(\S+?)，|。
        sample: http://wsjkw.sh.gov.cn/xwfb/20220309/077a50ff4cf4422d836e857126008ff6.html
    """
    r = requests.get(url, headers=headers, verify=False)
    content = r.content.decode("utf-8")
    texts = re.findall(r'居住于(\S+?)，|。', content, re.MULTILINE)
    addresses = list(filter(lambda x: x!="", texts))
    return list(set(addresses))


def extract_addresses3(url):
    """
    模版3(3/18+):
        title: 3月18日（0-24时）本市各区确诊病例、无症状感染者居住地信息
        prefix: ^(\S+?)弄|号|村
        sample: https://wsjkw.sh.gov.cn/xwfb/20220319/dc5938b3d12d4d86be7470ae03beac1c.html
    """
    r = requests.get(url, headers=headers, verify=False)
    content = r.content.decode("utf-8")
    # Pattern:弄|号|村|道|舍|号-3|宅|小区|街|街坊|邨
    # TODO: 如何从地址信息里去除html标签？
    # <span style="font-size:16px;font-family:宋体">草高支路656弄，</span>
    # <span style="font-family: 宋体;font-size: 21px"><span style="font-family:宋体">兰坪路</span>301弄22支弄，</span>
    texts = re.findall(r'(\S+[弄|号|村|道|舍|宅|区|街|坊|邨|上|园|\d+])[，|。]', content, re.MULTILINE)
    addresses = list(filter(lambda x: x!="", texts))
    return list(set(addresses))


def get_addresses():
    main_urls = [
        "https://wsjkw.sh.gov.cn/xwfb/index.html",
        "https://wsjkw.sh.gov.cn/xwfb/index_2.html",
        "https://wsjkw.sh.gov.cn/xwfb/index_3.html",
        "https://wsjkw.sh.gov.cn/xwfb/index_4.html",
        "https://wsjkw.sh.gov.cn/xwfb/index_5.html"
    ]
    base_url = "https://wsjkw.sh.gov.cn"
    addresses = []
    for main_url in main_urls:
        r = requests.get(main_url, headers=headers, verify=False)
        content = r.content.decode("utf-8")
        html = etree.HTML(content)
        a_nodes = html.xpath('//ul[contains(@class, "list-date")]/li/a')
        for node in a_nodes:
            sub_url = node.attrib["href"]
            title = node.attrib["title"]
            m = re.match(r'上海2022年(\d+)月(\d+)日', title)
            if not m:
                m = re.match(r'(\d+)月(\d+)日（0-24时）', title)
                if not m:
                    continue
            mon = int(m.group(1))
            date = int(m.group(2))
            dt = datetime.date(2022, mon, date)
            if dt < datetime.date(2022, 3, 6):
                # 3/6之前没有公布地址
                continue
            url = base_url + sub_url
            addresses.extend(extract_addresses(url))
    addresses = list(set(addresses))
    file_loader = FileSystemLoader('.')
    env = Environment(loader=file_loader)
    template = env.get_template('map_template.html')
    output = template.render(addresses=addresses)
    with open("map.html", "w") as f:
        f.write(output)


def get_addresses_on_date(date):
    main_urls = [
        "https://wsjkw.sh.gov.cn/xwfb/index.html",
        "https://wsjkw.sh.gov.cn/xwfb/index_2.html",
        "https://wsjkw.sh.gov.cn/xwfb/index_3.html",
        "https://wsjkw.sh.gov.cn/xwfb/index_4.html",
        "https://wsjkw.sh.gov.cn/xwfb/index_5.html"
    ]
    base_url = "https://wsjkw.sh.gov.cn"
    addresses = []
    dt = datetime.datetime.strptime(date, "%Y-%m-%d").date()
    for main_url in main_urls:
        r = requests.get(main_url, headers=headers, verify=False)
        content = r.content.decode("utf-8")
        html = etree.HTML(content)
        a_nodes = html.xpath('//ul[contains(@class, "list-date")]/li/a')
        for node in a_nodes:
            sub_url = node.attrib["href"]
            title = node.attrib["title"]
            if dt < datetime.date(2022, 3, 6):
                # 3/6之前没有公布地址
                continue
            url = base_url + sub_url

            if dt >= datetime.date(2022, 3, 18):
                patt = '{}月{}日（0-24时）'.format(dt.month, dt.day)
                m = re.match(patt, title)
                if not m:
                    continue
                parts = extract_addresses3(url)
            else:
                patt = '上海2022年{}月{}日'.format(dt.month, dt.day)
                m = re.match(patt, title)
                if not m:
                    continue
                if dt >= datetime.date(2022, 3, 8):
                    parts = extract_addresses2(url)
                else:
                    parts = extract_addresses1(url)

            addresses.extend(parts)
    addresses = list(set(addresses))
    file_loader = FileSystemLoader('.')
    env = Environment(loader=file_loader)
    filename = "data/{}.json".format(date)
    json_string = json.dumps(addresses, ensure_ascii=False)
    with open(filename, 'w') as f:
        f.write(json_string)


def get_addresses_from_url(url):
    r = requests.get(url, headers=headers, verify=False)
    content = r.content.decode("utf-8")
    html = etree.HTML(content)
    title = html.xpath('//title/text()')[0]
    m = re.search(r'上海2022年(\d+)月(\d+)日', title)
    if not m:
        m = re.match(r'(\d+)月(\d+)日（0-24时）', title)
    mon = int(m.group(1))
    date = int(m.group(2))
    dt = datetime.date(2022, mon, date)
    if dt >= datetime.date(2022, 3, 18):
        print(url)
        parts = extract_addresses3(url)
    elif dt >= datetime.date(2022, 3, 8):
        parts = extract_addresses2(url)
    else:
        parts = extract_addresses1(url)
    file_loader = FileSystemLoader('.')
    env = Environment(loader=file_loader)
    addresses = list(set(parts))
    filename = "data/2022-{:02d}-{:02d}.json".format(mon, date)
    json_string = json.dumps(addresses, ensure_ascii=False)
    with open(filename, 'w') as f:
        f.write(json_string)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--date", type=str, default=None, help="e.g. 2022-01-04")
    parser.add_argument("--url", type=str, default=None, help="e.g. https://")
    parser.add_argument("--test", type=str, default="2022-03-20", help="e.g. 2022-01-04")
    args = parser.parse_args()
    if args.date:
        get_addresses_on_date(args.date)
    elif args.url:
        get_addresses_from_url(args.url)
    elif args.test:
        extract_addresses(args.test)
    else:
        get_addresses()
