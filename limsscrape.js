var Browser = require("zombie");

exports.get = function (lawNo, callback) {
    var out = {};

    //Go to the LIMS page
    var browser = new Browser({ debug: false, runScripts: false });
    browser.visit("http://dcclims1.dccouncil.us/lims/legislation.aspx?LegNo=" + lawNo, function() {

        var fields = ["LegislationTitle","LegislationNo","ShortTitle","ActNoGI","LawNo","DateExpirationGI","DateEnactmentGI","DateEffectiveGI","DateIntroduction","PlaceIntroduction","DateCirculation","CommitteeReferral","Comments","OfficialReferral","DateReReferral","CommitteeReassign","CommentsReassign","DatePublicNotice","IntroducedBy","RequestedBy","CoSponsoredBy","DateCommitteeAction","ReportFiled","COWAction","DateFirstVote","DateFinalVote","DateThirdVote","DateReconsideration","DateTransmittedMayor","DateReviewEnd","DateSigned","Signature","DateReturned","ReturnedSignature","DateOverride","ActNo","DateEnactment","DateVeto","DateTransmittedCongress","DateReTransmitted","DateDCLaw","DatePublication","DCLawVol","DCLawPage","DCLaw","DCLawNo","DateEffective","DateApplicability","DateExpiration"];

        fields.forEach(function(f) {
            var d = browser.query("#" + f);
            out[f] = d.innerHTML;
        });

        //Additional metadata -- Documents
        var versions = browser.queryAll("A[id^=DocumentRepeater]");
        var v = [];
		versions.forEach(function (d) {
            v.push(d.innerHTML + '":"' + d.href);
        });
        out.versions = v;
        callback(null, out);
    });
};
