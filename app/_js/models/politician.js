/**
    Politician Model
**/
var Politician = Composer.Model.extend({
    populateFromGoogle: function(entry) {

        var e = function(field) { return entry['gsx$'+field]['$t'].trim(); };

        this.set({
            first_name:      e('first'),
            last_name:       e('name'),
            image:           e('imagepleasedontedit'),
            bioguide:        e('bioguide'),
            email:           e('email'),
            phone:           e('phone'),
            organization:    e('organization'),
            state:           e('state'),
            state_short:     this.shortenState(e('state')),
            twitter:         e('twitter'),
            party:           e('partyaffiliation'),
            vote_usaf:       e('voteusaf'),
            vote_tempreauth: e('votetempreauth'),
            office1:         e('office1'),
            office1phone:    e('office1phone'),
            office1geo:      e('office1geo'),
            office2:         e('office2'),
            office2phone:    e('office2phone'),
            office2geo:      e('office2geo'),
            office3:         e('office3'),
            office3phone:    e('office3phone'),
            office3geo:      e('office3geo'),
            office4:         e('office4'),
            office4phone:    e('office4phone'),
            office4geo:      e('office4geo'),
            office5:         e('office5'),
            office5phone:    e('office5phone'),
            office5geo:      e('office5geo'),
            office6:         e('office6'),
            office6phone:    e('office6phone'),
            office6geo:      e('office6geo'),
            office7:         e('office7'),
            office7phone:    e('office7phone'),
            office7geo:      e('office7geo'),
            office8:         e('office8'),
            office8phone:    e('office8phone'),
            office8geo:      e('office8geo'),

            // meta field
            score: 0,
            score_criteria: [],

            // scorecard fields
            fisa_courts_reform_act:                                 e('fisacourtsreformact'),
            s_1551_iosra:                                           e('s1551iosra'),
            fisa_improvements_act:                                  e('fisaimprovementsact'),
            fisa_transparency_and_modernization_act:                e('fisatransparencyandmodernizationact'),
            surveillance_state_repeal_act:                          e('surveillancestaterepealact'),
            usa_freedom_prior_to_20140518:                          e('usafreedompriorto2014-05-18'),
            voted_for_conyers_amash_amendment:                      e('votedforconyersamashamendment'),
            voted_for_house_version_of_usa_freedom_act_2014:        e('votedforhouseversionofusafreedomact2014'),
            voted_for_massie_lofgren_amendment_2014:                e('votedformassielofgrenamendment2014'),
            whistleblower_protection_for_ic_employees_contractors:  e('whistleblowerprotectionforicemployeescontractors'),
            first_usaf_cloture_vote:                                e('stusafcloturevote'),
            straight_reauth:                                        e('straightreauth'),
            fisa_reform_act:                                        e('fisareformact'),
            amendment_1449_data_retention:                          e('amendment1449dataretention'),
            amendment_1450_extend_implementation_to_1yr:            e('amendment1450extendimplementationto1yr'),
            amendment_1451_gut_amicus:                              e('amendment1451gutamicus'),
            final_passage_usaf:                                     e('finalpassageusaf'),
            s_702_reforms:                                          e('reforms'),
            massie_lofgren_amendment_to_hr2685_defund_702:          e('massielofgrenamendmenttohr2685defund702'),
            massie_lofgren_amendment_to_hr4870_no_backdoors:        e('massielofgrenamendmenttohr4870nobackdoors'),
            ECPA_reform_cosponsor:e('ecpareformcosponsor'),
            house_PCNA:e('housepcna'),
            house_NCPA:e('housencpaa'),
            ECPA_reform_cosponsor:e('ecpareformcosponsor'),
            CISA_cloture_vote:e('cisacloture'),
            franken_cisa_amendment:e('frankencisaamendment'),
            wyden_cisa_amendment:e('wydencisaamendment'),
            heller_cisa_amendment:e('hellercisaamendment'),
            coons_cisa_amendment:e('coonscisaamendment'),
            coons_cisa_amendment:e('cottoncisaamendment'),
            cisa_final:e('cisafinal')
        }, {silent: true});
        this.doScore();
    },

    doScore: function() {
        var score = 0;
        var score_criteria = [];

        if (this.get('fisa_courts_reform_act') == 'X') {
            var inc = 3;
            score_criteria.push({
                score:  inc,
                info:   'Supported the FISA Courts Reform Act',
                url: 'http://www.ibtimes.com/nsa-fisa-surveillance-obama-likely-back-secret-court-reform-senator-says-1368781'
            });
            score += inc;
        }
        if (this.get('s_1551_iosra') == 'X') {
            var inc = 4;
            score_criteria.push({
                score:  inc,
                info:   'Supported the Intelligence Oversight and Surveillance Reform Act',
                url:   'https://cdt.org/blog/bills-offer-clear-choice-end-bulk-collection-of-americans%E2%80%99-data-or-endorse-it/'
            });
            score += inc;
        }
        if (this.get('fisa_improvements_act') == 'X') {
            var inc = -4;
            score_criteria.push({
                score:  inc,
                info:   'Supported the FISA Improvements Act',
                url:'http://www.theguardian.com/world/2013/nov/15/feinstein-bill-nsa-warrantless-searches-surveillance'
            });
            score += inc;
        }
        if (this.get('fisa_transparency_and_modernization_act') == 'X') {
            var inc = -4;
            score_criteria.push({
                score:  inc,
                info:   'Supported the FISA Transparency and Modernization Act',
                url:'https://www.eff.org/deeplinks/2014/04/nsa-reform-bill-intelligence-community-written-intelligence-community-and'
            });
            score += inc;
        }
        if (this.get('surveillance_state_repeal_act') == 'X') {
            var inc = 4;
            score_criteria.push({
                score:  inc,
                info:   'Supported the Surveillance State Repeal Act',
                url:'http://www.restorethe4th.com/blog/go-big-or-go-home-pass-the-new-surveillance-state-repeal-act/'
            });
            score += inc;
        }
        if (this.get('usa_freedom_prior_to_20140518') == 'X') {
            var inc = 2;
            score_criteria.push({
                score:  inc,
                info:   'Supported the original USA Freedom Act (prior to May 18th, 2014)',
                url:' https://www.eff.org/deeplinks/2014/07/new-senate-usa-freedom-act-first-step-towards-reforming-mass-surveillance'
            });
            score += inc;
        }
        if (this.get('voted_for_conyers_amash_amendment') == 'X') {
            var inc = 4;
            score_criteria.push({
                score:  inc,
                info:   'Voted for Conyers Amash Amendment',
                url: ' http://americablog.com/2013/07/amash-conyers-anti-nsa-amendment-lost-by-12-votes-205-217.html'
            });
            score += inc;
        }
        if (this.get('voted_for_house_version_of_usa_freedom_act_2014') == 'X') {
            var inc = -2;
            score_criteria.push({
                score:  inc,
                info:   'Voted for gutted House version of USA Freedom Act of 2014',
                url: 'https://www.eff.org/deeplinks/2014/05/eff-dismayed-houses-gutted-usa-freedom-act'
            });
            score += inc;
        }
        if (this.get('voted_for_massie_lofgren_amendment_2014') == 'X') {
            var inc = 3;
            score_criteria.push({
                score:  inc,
                info:   'Voted for Massie-Lofgren Amendment (2014)',
                url:' http://www.huffingtonpost.com/2014/12/10/nsa-surveillance-spending-bill_n_6304834.html'
            });
            score += inc;
        }
        if (this.get('whistleblower_protection_for_ic_employees_contractors') == 'X') {
            var inc = 4;
            score_criteria.push({
                score:  inc,
                info:   'Supported whistleblower protection measures for Intelligence employees and contractors',
                url:'http://whistleblower.org/blog/121230-49-orgs-call-congress-restore-whistleblower-rights-intelligence-contractors'
            });
            score += inc;
        }
        if (this.get('first_usaf_cloture_vote') == 'GOOD') {
            var inc = 4;
            score_criteria.push({
                score:  inc,
                info:   'Voted NO on reauthorizing the PATRIOT Act *and* NO on cloture for the first Senate USA Freedom Act',
                url:'http://www.thewhir.com/web-hosting-news/senate-votes-to-invoke-cloture-on-usa-freedom-act-advancing-it-to-an-amendment-process'

            });
            score += inc;
        }
        else if (this.get('first_usaf_cloture_vote') == 'OK') {
            var inc = -1;
            score_criteria.push({
                score:  inc,
                info:   'Voted NO on reauthorizing the PATRIOT Act *and* YES on cloture for the first Senate USA Freedom Act',
                url:'http://www.thewhir.com/web-hosting-news/senate-votes-to-invoke-cloture-on-usa-freedom-act-advancing-it-to-an-amendment-process'
            });
            score += inc;
        }
        else if (this.get('first_usaf_cloture_vote') == 'BAD') {
            var inc = -4;
            score_criteria.push({
                score:  inc,
                info:   'Voted YES on reauthorizing the PATRIOT Act and NO on the first USA Freedom Act cloture vote',
                url:'http://thehill.com/policy/national-security/242173-mcconnell-introduces-short-term-nsa-bill'
            });
            score += inc;
        }
        if (this.get('straight_reauth') == 'GOOD') {
            var inc = 3;
            score_criteria.push({
                score:  inc,
                info:   'Voted NO on reauthorizing the PATRIOT Act',
                url:'http://thehill.com/policy/national-security/242173-mcconnell-introduces-short-term-nsa-bill'
            });
            score += inc;
        }
        else if (this.get('straight_reauth') == 'BAD') {
            var inc = -3;
            score_criteria.push({
                score:  inc,
                info:   'Voted YES on reauthorizing the PATRIOT Act',
                url:'https://cdt.org/insight/oppose-senator-feinsteins-fisa-reform-act-of-2015/'
            });
            score += inc;
        }
        if (this.get('fisa_reform_act') == 'X') {
            var inc = -3;
            score_criteria.push({
                score:  inc,
                info:   'Supported the FISA Reform Act',
                url:'https://www.eff.org/deeplinks/2015/06/eff-opposes-amendments-weakening-usa-freedom-act'
            });
            score += inc;
        }
        if (this.get('amendment_1449_data_retention') == 'GOOD') {
            var inc = 1;
            score_criteria.push({
                score:  inc,
                info:   'Voted NO on USA Freedom data retention amendment (1449)',
                url: 'https://www.eff.org/deeplinks/2015/06/eff-opposes-amendments-weakening-usa-freedom-act'
            });
            score += inc;
        }
        else if (this.get('amendment_1449_data_retention') == 'BAD') {
            var inc = -3;
            score_criteria.push({
                score:  inc,
                info:   'Voted YES on USA Freedom data retention amendment (1449)',
                url: 'https://www.eff.org/deeplinks/2015/06/eff-opposes-amendments-weakening-usa-freedom-act'
            });
            score += inc;
        }
        if (this.get('amendment_1450_extend_implementation_to_1yr') == 'GOOD') {
            var inc = 1;
            score_criteria.push({
                score:  inc,
                info:   'Voted NO on amendment 1450 extending implementation of USA Freedom Act by 1 year',
                url:'https://www.eff.org/deeplinks/2015/06/eff-opposes-amendments-weakening-usa-freedom-act'
            });
            score += inc;
        }
        else if (this.get('amendment_1450_extend_implementation_to_1yr') == 'BAD') {
            var inc = -2;
            score_criteria.push({
                score:  inc,
                info:   'Voted YES on amendment 1450 extending implementation of USA Freedom Act by 1 year',
                url:'https://www.eff.org/deeplinks/2015/06/eff-opposes-amendments-weakening-usa-freedom-act'
            });
            score += inc;
        }
        if (this.get('amendment_1451_gut_amicus') == 'GOOD') {
            var inc = 1;
            score_criteria.push({
                score:  inc,
                info:   'Voted NO on amendment 1451 to gut amicus proceedings',
                url: 'https://www.eff.org/deeplinks/2015/06/eff-opposes-amendments-weakening-usa-freedom-act'
            });
            score += inc;
        }
        else if (this.get('amendment_1451_gut_amicus') == 'BAD') {
            var inc = -3;
            score_criteria.push({
                score:  inc,
                info:   'Voted YES on amendment 1451 to gut amicus proceedings',
                url: 'https://www.eff.org/deeplinks/2015/06/eff-opposes-amendments-weakening-usa-freedom-act'
            });
            score += inc;
        }
        if (this.get('final_passage_usaf') == 'GOOD') {
            var inc = 4;
            score_criteria.push({
                score:  inc,
                info:   'Voted NO on USA Freedom Act (final passage)',
                url:"http://www.restorethe4th.com/blog/most-reps-voting-for-usa-freedom-were-opponents-of-surveillance-reform/"
            });
            score += inc;
        }
        else if (this.get('final_passage_usaf') == 'OK') {
            var inc = -1;
            score_criteria.push({
                score:  inc,
                info:   'Voted YES on reforming bulk collection via USAF',
                url:'https://www.eff.org/deeplinks/2015/05/usa-freedom-act-passes-what-we-celebrate-what-we-mourn-and-where-we-go-here'
            });
            score += inc;
        }
        else if (this.get('final_passage_usaf') == 'BAD') {
            var inc = -4;
            score_criteria.push({
                score:  inc,
                info:   'Voted NO on USA Freedom Act (final passage) and YES on extending the PATRIOT Act',
                url:"http://www.restorethe4th.com/blog/most-reps-voting-for-usa-freedom-were-opponents-of-surveillance-reform/"
            });
            score += inc;
        }
        if (this.get('s_702_reforms') == 'X') {
            var inc = 4;
            score_criteria.push({
                score:  inc,
                info:   'Supported bills reforming Section 702 of FISA',
                url:undefined
            });
            score += inc;
        }
        if (this.get('massie_lofgren_amendment_to_hr2685_defund_702') == 'GOOD') {
            var inc = 3;
            score_criteria.push({
                score:  inc,
                info:   'Voted YES on Massie-Lofgren Amendment to HR2685: Defund Section 702 surveillance',
                url:'https://demandprogress.org/letter-of-support-for-massie-lofgren-amendment-to-the-department-of-defense-appropriations-act-of-2016-h-r-2685/'
            });
            score += inc;
        }
        else if (this.get('massie_lofgren_amendment_to_hr2685_defund_702') == 'BAD') {
            var inc = -3;
            score_criteria.push({
                score:  inc,
                info:   'Voted NO on Massie-Lofgren Amendment to HR2685: Defund Section 702 surveillance',
                url:'https://demandprogress.org/letter-of-support-for-massie-lofgren-amendment-to-the-department-of-defense-appropriations-act-of-2016-h-r-2685/'
            });
            score += inc;
        }
        if (this.get('massie_lofgren_amendment_to_hr4870_no_backdoors') == 'GOOD') {
            var inc = 3;
            score_criteria.push({
                score:  inc,
                info:   'Voted YES on Massie-Lofgren Amendment to HR4870: Ban encryption backdoors',
                url: 'https://shutthebackdoor.net/'
            });
            score += inc;
        }
        else if (this.get('massie_lofgren_amendment_to_hr4870_no_backdoors') == 'BAD') {
            var inc = -3;
            score_criteria.push({
                score:  inc,
                info:   'Voted NO on Massie-Lofgren Amendment to HR4870: Ban encryption backdoors',
                url: 'https://shutthebackdoor.net/'
            });
            score += inc;
        }
        if (this.get('ECPA_reform_cosponsor') == 'GOOD') {
            console.log("ECPA")
            var inc = 2;
            score_criteria.push({
                score:  inc,
                info:   'Co-Sponsor of Electronic Commmunication Privacy Act Reform',
                url: 'https://www.eff.org/deeplinks/2015/09/senate-judiciary-committee-finally-focuses-ecpa-reform'
            });
            score += inc;
        }
        if (this.get('CISA_cloture_vote') == 'BAD') {
            var inc = -4;
            score_criteria.push({
                score:  inc,
                info:   'Voted for CISA Cloture Vote',
                url: 'http://www.slate.com/articles/technology/future_tense/2015/10/stopcisa_the_cybersecurity_information_sharing_act_is_a_disaster.html'
            });
            score += inc;
        }
        else if (this.get('CISA_cloture_vote') == 'GOOD') {
            var inc = 4;

            score_criteria.push({
                score: inc,
                info:   'Voted against CISA Cloture Vote',
                url: 'http://www.slate.com/articles/technology/future_tense/2015/10/stopcisa_the_cybersecurity_information_sharing_act_is_a_disasteecpareformcosponsorr.html'
            });
            score += inc;
        }
        if (this.get('house_NCPA') == 'BAD') {
            var inc = -2;
            score_criteria.push({
                score:  inc,
                info:   'Voted for National Cybersecurity Protection Advancement Act',
                url: 'http://techcrunch.com/2015/04/23/house-passes-complementary-cyber-information-sharing-bill/'
            });
            score += inc;
        }
        else if (this.get('house_NCPA') == 'GOOD') {
            var inc = 2;

            score_criteria.push({
                score: inc,
                info:   'Voted against National Cybersecurity Protection Advancement Act',
                url: 'http://techcrunch.com/2015/04/23/house-passes-complementary-cyber-information-sharing-bill/'
            });
            score += inc;
        }
        if (this.get('house_PCNA') == 'BAD') {
            var inc = -3;
            score_criteria.push({
                score:  inc,
                info:   'Voted for The Protecting Cyber Networks Act ',
                url: 'https://www.eff.org/deeplinks/2015/04/eff-congress-stop-cybersurveillance-bills'
            });
            score += inc;
        }
        else if (this.get('house_PCNA') == 'GOOD') {
            var inc = 3;

            score_criteria.push({
                score: inc,
                info:   'Voted against The Protecting Cyber Networks Act ',
                url: 'https://www.eff.org/deeplinks/2015/04/eff-congress-stop-cybersurveillance-bills'
            });
            score += inc;
        }
        if (this.get('franken_cisa_amendment') == 'BAD') {
            var inc = -1;
            score_criteria.push({
                score:  inc,
                info:   'Voted against the Franken CISA amendment',
                url: 'http://www.newsweek.com/senate-passes-controversial-cisa-bill-companies-share-cyber-security-387785'
            });
            score += inc;
        }
        else if (this.get('franken_cisa_amendment') == 'GOOD') {
            var inc = 2;

            score_criteria.push({
                score: inc,
                info:   'Voted for the Franken CISA amendment ',
                url: 'http://www.newsweek.com/senate-passes-controversial-cisa-bill-companies-share-cyber-security-387785'
            });
            score += inc;
        }
        if (this.get('wyden_cisa_amendment') == 'BAD') {
            var inc = -1;
            score_criteria.push({
                score:  inc,
                info:   'Voted against the Wyden CISA amendment',
                url: 'http://www.freedomworks.org/content/key-vote-yes-wyden-amendment-strengthen-privacy-protections-cisa'
            });
            score += inc;
        }
        else if (this.get('wyden_cisa_amendment') == 'GOOD') {
            var inc = 2;

            score_criteria.push({
                score: inc,
                info:   'Voted for the Wyden CISA amendment ',
                url: 'http://www.freedomworks.org/content/key-vote-yes-wyden-amendment-strengthen-privacy-protections-cisa'
            });
            score += inc;
        }
        if (this.get('heller_cisa_amendment') == 'BAD') {
            var inc = -1;
            score_criteria.push({
                score:  inc,
                info:   'Voted against the Heller CISA amendment',
                url: 'https://cdt.org/blog/guide-to-cybersecurity-information-sharing-act-amendments/'
            });
            score += inc;
        }
        else if (this.get('heller_cisa_amendment') == 'GOOD') {
            var inc = 1;

            score_criteria.push({
                score: inc,
                info:   'Voted for the Heller CISA amendment ',
                url: 'https://cdt.org/blog/guide-to-cybersecurity-information-sharing-act-amendments/'
            });
            score += inc;
        }
        if (this.get('coons_cisa_amendment') == 'BAD') {
            var inc = -1;
            score_criteria.push({
                score:  inc,
                info:   'Voted against the Coons CISA amendment',
                url: 'https://cdt.org/blog/guide-to-cybersecurity-information-sharing-act-amendments/'
            });
            score += inc;
        }
        else if (this.get('coons_cisa_amendment') == 'GOOD') {
            var inc = 1;

            score_criteria.push({
                score: inc,
                info:   'Voted for the Coons CISA amendment ',
                url: 'https://cdt.org/blog/guide-to-cybersecurity-information-sharing-act-amendments/'
            });
            score += inc;
        }
        if (this.get('cotton_cisa_amendment') == 'BAD') {
            var inc = -2;
            score_criteria.push({
                score:  inc,
                info:   'Voted for the Cotton CISA amendment',
                url: 'https://cdt.org/blog/guide-to-cybersecurity-information-sharing-act-amendments/'
            });
            score += inc;
        }
        else if (this.get('cotton_cisa_amendment') == 'GOOD') {
            var inc = 1;

            score_criteria.push({
                score: inc,
                info:   'Voted against the Cotton CISA amendment ',
                url: 'https://cdt.org/blog/guide-to-cybersecurity-information-sharing-act-amendments/'
            });
            score += inc;
        }
        if (this.get('cisa_final') == 'BAD') {
            var inc = -4;
            score_criteria.push({
                score:  inc,
                info:   'Voted for CISA in the final vote',
                url: 'http://www.vox.com/platform/amp/2015/10/21/9587190/cisa-senate-privacy-nsa'
            });
            score += inc;
        }
        else if (this.get('cisa_final') == 'GOOD') {
            var inc = 4;

            score_criteria.push({
                score: inc,
                info:   'Voted against CISA in the final vote ',
                url: 'http://www.vox.com/platform/amp/2015/10/21/9587190/cisa-senate-privacy-nsa'
            });
            score += inc;
        }
        if(score >= 15){
            var grade="A+"
        }
        else if(score >= 12){
            var grade="A"
        }
        else if(score >= 10){
            var grade="A-"
        }
        else if(score >= 9){
            var grade="B+"
        }
        else if(score >= 8){
            var grade="B"
        }
        else if(score >= 7){
            var grade="B-"
        }
        else if(score >= 6){
            var grade="B-"
        }
        else if(score >= 5){
            var grade="C+"
        }
        else if(score >= 3){
            var grade="C"
        }
        else if(score >= 0){
            var grade="C-"
        }
        else if(score >= -2){
            var grade="D+"
        }
        else if(score >= -7){
            var grade="D"
        }
        else if(score >= -9){
            var grade="D-"
        }
        else if (this.get('last_name') == 'McConnell') {
            var grade="F-"
        }
        else{
            var grade="F"
        }
        this.set({
            score: score,
            grade: grade,
            score_criteria: score_criteria
        });
    },

    shortenState: function(state) {
        for (var key in STATES)
            if (STATES.hasOwnProperty(key))
                if (STATES[key] == state)
                    return key;
    }
});

/**
    Politicians Collection
**/
var Politicians = Composer.Collection.extend({
    sortfn: function(a, b) {

        if (a.get('state_short') < b.get('state_short'))
            return - 1;
        else if (a.get('state_short') > b.get('state_short'))
            return 1;
        else
            if (a.get('last_name') < b.get('last_name'))
                return -1;
            if (a.get('last_name') > b.get('last_name'))
                return 1;
            return 0;

    },
});

var PoliticiansFilter = Composer.FilterCollection.extend({

    state: 'MA',

    filter: function(model) {
        var state = this.state;

        if (state == 'all')
            return true;
        else if (state == 'house')
            return model.get('organization') == 'House';
        else if (state == 'senate')
            return model.get('organization') == 'Senate';
        else
            return model.get('state_short') == this.state;
    }
});
