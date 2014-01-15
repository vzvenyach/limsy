exports.get = function (lawNo) {
    var request = require("request");
    var cheerio = require("cheerio");
    var _ = require("underscore");
    var out = {};

    //Go to the LIMS page 
    request("http://dcclims1.dccouncil.us/lims/legislation.aspx?LegNo=" + lawNo, function(e, r, body) {

            var fields = ["LegislationTitle","LegislationNo","ShortTitle","ActNoGI","LawNo","DateExpirationGI","DateEnactmentGI","DateEffectiveGI","DateIntroduction","PlaceIntroduction","DateCirculation","CommitteeReferral","Comments","OfficialReferral","DateReReferral","CommitteeReassign","CommentsReassign","DatePublicNotice","IntroducedBy","RequestedBy","CoSponsoredBy","DateCommitteeAction","ReportFiled","COWAction","DateFirstVote","DateFinalVote","DateThirdVote","DateReconsideration","DateTransmittedMayor","DateReviewEnd","DateSigned","Signature","DateReturned","ReturnedSignature","DateOverride","ActNo","DateEnactment","DateVeto","DateTransmittedCongress","DateReTransmitted","DateDCLaw","DatePublication","DCLawVol","DCLawPage","DCLaw","DCLawNo","DateEffective","DateApplicability","DateExpiration"];

            var $ = body.load();
           	_.each(fields, function(f) {
            	var d = $("#" + f);
                out[f] = d.text();
            });

            //Additional metadata -- Documents
            var versions = $.find("A[id^=DocumentRepeater]");
            var v = []
			_.each(versions, function (d) {
                v.push('"' + d.text() + '":"' + d.attr('href') + '"');
            });
            out["'versions'"] = v;
            console.log(JSON.stringify(out));
        });

    });
	
}