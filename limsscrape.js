exports.get = function (lawNo) {
    var Browser = require("zombie");
    var _ = require("underscore");
    var out = {};

    //Go to the LIMS page 
    var browser = new Browser({ debug: false, runScripts: false });
    browser.visit("http://dcclims1.dccouncil.us/lims/viewlegislation.aspx", function(callback) {

        //Fill in the form
        browser.fill("FullLegNo", lawNo).

        //Press the "Search" button
        pressButton("Search", function() {
            //assert.ok(browser.success);

            var fields = ["LegislationTitle","LegislationNo","ShortTitle","ActNoGI","LawNo","DateExpirationGI","DateEnactmentGI","DateEffectiveGI","DateIntroduction","PlaceIntroduction","DateCirculation","CommitteeReferral","Comments","OfficialReferral","DateReReferral","CommitteeReassign","CommentsReassign","DatePublicNotice","IntroducedBy","RequestedBy","CoSponsoredBy","DateCommitteeAction","ReportFiled","COWAction","DateFirstVote","DateFinalVote","DateThirdVote","DateReconsideration","DateTransmittedMayor","DateReviewEnd","DateSigned","Signature","DateReturned","ReturnedSignature","DateOverride","ActNo","DateEnactment","DateVeto","DateTransmittedCongress","DateReTransmitted","DateDCLaw","DatePublication","DCLawVol","DCLawPage","DCLaw","DCLawNo","DateEffective","DateApplicability","DateExpiration"];

            _.each(fields, function(f) {
            	var d = browser.query("#" + f);
                out[d.id] = d.innerHTML;
            });

            //Additional metadata -- Documents
            var versions = browser.queryAll("A[id^=DocumentRepeater]");
            var v = []
			_.each(versions, function (d) {
                v.push('"' + d.innerHTML + '":"' + d.href + '"');
            });
            out["'versions'"] = v;
            console.log(JSON.stringify(out));
        });

    });
	
}