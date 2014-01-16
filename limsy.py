#!/usr/bin/env python

#LIMS Scraper

from pyquery import PyQuery as pq
import json
import re
import os

def get ( mNo ):

  url="http://dcclims1.dccouncil.us/lims/legislation.aspx?LegNo=" + mNo
  ss = pq(url)

  data = {}

  fields = ["LegislationTitle","LegislationNo","ShortTitle","ActNoGI","LawNo","DateExpirationGI","DateEnactmentGI","DateEffectiveGI","DateIntroduction","PlaceIntroduction","DateCirculation","CommitteeReferral","Comments","OfficialReferral","DateReReferral","CommitteeReassign","CommentsReassign","DatePublicNotice","IntroducedBy","RequestedBy","CoSponsoredBy","DateCommitteeAction","ReportFiled","COWAction","DateFirstVote","DateFinalVote","DateThirdVote","DateReconsideration","DateTransmittedMayor","DateReviewEnd","DateSigned","Signature","DateReturned","ReturnedSignature","DateOverride","ActNo","DateEnactment","DateVeto","DateTransmittedCongress","DateReTransmitted","DateDCLaw","DatePublication","DCLawVol","DCLawPage","DCLaw","DCLawNo","DateEffective","DateApplicability","DateExpiration"];
  for f in fields:
    content = ss('#' + f)
    data[f] = content.text();

  versions = ss("A[id^=DocumentRepeater]");
  v = []
  for docs in versions:
    d = pq(docs)
    v.append({"version":d.text(),"url":d.attr('href')})
  data["versions"] = v

  data["source"] = url

  return [data]

measures = open('./limsrecords.csv','r').read().split(',')

for m in measures:
  f = open('./out.json','a')
  f.write(json.dumps(get(m),indent=2))
  f.close()