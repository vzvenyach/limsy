#!/usr/bin/env python

import json
import re
import urllib

f = open('./out.json','r')
measures = json.load(f) 

f_log = open ('./pdfs/log.txt','w')

bname = "http://dcclims1.dccouncil.us"

for m in measures:
	measure_id = m['LegislationNo']
	for doc in m['versions']:
		fname = './pdfs/' + measure_id + "_" + doc['version'] + '.pdf'
		url = re.sub('\.\.', bname, doc['url'])
		try:
			urllib.urlretrieve(url,fname)
			f_log.write(fname + ' added.')
		except:
			f_log("ERROR: There was an error here for:" + fname + "url: " + url)


'''
Naming convention: "B12-0144_[version].pdf"
'''