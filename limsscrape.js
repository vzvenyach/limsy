var Browser = require("zombie");

exports.get = function (lawNo, callback) {
    var out = {};

    //Go to the LIMS page
    var browser = new Browser({ debug: false, runScripts: false });
    var url = "http://dcclims1.dccouncil.us/lims/legislation.aspx?LegNo=" + lawNo;
    browser.visit(url, function() {

        var fields = ["LegislationTitle","LegislationNo","ShortTitle","ActNoGI","LawNo","DateExpirationGI","DateEnactmentGI","DateEffectiveGI","DateIntroduction","PlaceIntroduction","DateCirculation","CommitteeReferral","Comments","OfficialReferral","DateReReferral","CommitteeReassign","CommentsReassign","DatePublicNotice","IntroducedBy","RequestedBy","CoSponsoredBy","DateCommitteeAction","ReportFiled","COWAction","DateFirstVote","DateFinalVote","DateThirdVote","DateReconsideration","DateTransmittedMayor","DateReviewEnd","DateSigned","Signature","DateReturned","ReturnedSignature","DateOverride","ActNo","DateEnactment","DateVeto","DateTransmittedCongress","DateReTransmitted","DateDCLaw","DatePublication","DCLawVol","DCLawPage","DCLaw","DCLawNo","DateEffective","DateApplicability","DateExpiration"];

        fields.forEach(function(f) {
            var d = browser.query("#" + f);
            out[f] = d.innerHTML;
        });

        //Additional metadata -- Documents
        var versions = browser.queryAll("A[id^=DocumentRepeater]");
        var v = [];
		versions.forEach(function (d) {
            v.push({"version":d.innerHTML,"url":d.href});
        });
        out.versions = v;
        out.source = url;
        callback(null, JSON.stringify(out));
    });
};
