#!/usr/bin/env python

import json

f = open('./out.json','r')
measures = json.load(f) 

for m in measures:
	measure_id = m['LegislationNo']
	for doc in m['versions']:
		print "Measure No: " + measure_id + ", version: " + doc['version'] + ', url: ' + doc['url']

'''
Sample output: "Measure No: B12-0144, version: Committee Report, url: ../images/00001/CP12/062324922_1.PDF"
Naming convention: "B12-0144_version.pdf"