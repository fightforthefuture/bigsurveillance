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
                info:   'Supported the FISA Courts Reform Act'
            });
            score += inc;
        }
        if (this.get('s_1551_iosra') == 'X') {
            var inc = 4;
            score_criteria.push({
                score:  inc,
                info:   'Supported the Intelligence Oversight and Surveillance Reform Act'
            });
            score += inc;
        }
        if (this.get('fisa_improvements_act') == 'X') {
            var inc = -4;
            score_criteria.push({
                score:  inc,
                info:   'Supported the FISA Improvements Act'
            });
            score += inc;
        }
        if (this.get('fisa_transparency_and_modernization_act') == 'X') {
            var inc = -4;
            score_criteria.push({
                score:  inc,
                info:   'Supported the FISA Transparency and Modernization Act'
            });
            score += inc;
        }
        if (this.get('surveillance_state_repeal_act') == 'X') {
            var inc = 4;
            score_criteria.push({
                score:  inc,
                info:   'Supported the Surveillance State Repeal Act'
            });
            score += inc;
        }
        if (this.get('usa_freedom_prior_to_20140518') == 'X') {
            var inc = 2;
            score_criteria.push({
                score:  inc,
                info:   'Supported the original USA Freedom Act (prior to May 18th, 2014)'
            });
            score += inc;
        }
        if (this.get('voted_for_conyers_amash_amendment') == 'X') {
            var inc = 4;
            score_criteria.push({
                score:  inc,
                info:   'Voted for Conyers Amash Amendment'
            });
            score += inc;
        }
        if (this.get('voted_for_house_version_of_usa_freedom_act_2014') == 'X') {
            var inc = -2;
            score_criteria.push({
                score:  inc,
                info:   'Voted for gutted House version of USA Freedom Act of 2014'
            });
            score += inc;
        }
        if (this.get('voted_for_massie_lofgren_amendment_2014') == 'X') {
            var inc = 3;
            score_criteria.push({
                score:  inc,
                info:   'Voted for Massie-Lofgren Amendment (2014)'
            });
            score += inc;
        }
        if (this.get('whistleblower_protection_for_ic_employees_contractors') == 'X') {
            var inc = 4;
            score_criteria.push({
                score:  inc,
                info:   'Supported whistleblower protection measures for Intelligence employees and contractors'
            });
            score += inc;
        }
        if (this.get('first_usaf_cloture_vote') == 'GOOD') {
            var inc = 4;
            score_criteria.push({
                score:  inc,
                info:   'Voted NO on reauthorizing the PATRIOT Act *and* NO on cloture for the first Senate USA Freedom Act'
            });
            score += inc;
        }
        else if (this.get('first_usaf_cloture_vote') == 'OK') {
            var inc = 1;
            score_criteria.push({
                score:  inc,
                info:   'Voted NO on reauthorizing the PATRIOT Act *and* YES on cloture for the first Senate USA Freedom Act'
            });
            score += inc;
        }
        else if (this.get('first_usaf_cloture_vote') == 'BAD') {
            var inc = -4;
            score_criteria.push({
                score:  inc,
                info:   'Voted YES on reauthorizing the PATRIOT Act and NO on the first USA Freedom Act cloture vote'
            });
            score += inc;
        }
        if (this.get('straight_reauth') == 'GOOD') {
            var inc = 3;
            score_criteria.push({
                score:  inc,
                info:   'Voted NO on reauthorizing the PATRIOT Act'
            });
            score += inc;
        }
        else if (this.get('straight_reauth') == 'BAD') {
            var inc = -3;
            score_criteria.push({
                score:  inc,
                info:   'Voted YES on reauthorizing the PATRIOT Act'
            });
            score += inc;
        }
        if (this.get('fisa_reform_act') == 'X') {
            var inc = -3;
            score_criteria.push({
                score:  inc,
                info:   'Supported the FISA Reform Act'
            });
            score += inc;
        }
        if (this.get('amendment_1449_data_retention') == 'GOOD') {
            var inc = 1;
            score_criteria.push({
                score:  inc,
                info:   'Voted NO on USA Freedom data retention amendment (1449)'
            });
            score += inc;
        }
        else if (this.get('amendment_1449_data_retention') == 'BAD') {
            var inc = -3;
            score_criteria.push({
                score:  inc,
                info:   'Voted YES on USA Freedom data retention amendment (1449)'
            });
            score += inc;
        }
        if (this.get('amendment_1450_extend_implementation_to_1yr') == 'GOOD') {
            var inc = 1;
            score_criteria.push({
                score:  inc,
                info:   'Voted NO on amendment 1450 extending implementation of USA Freedom Act by 1 year'
            });
            score += inc;
        }
        else if (this.get('amendment_1450_extend_implementation_to_1yr') == 'BAD') {
            var inc = -2;
            score_criteria.push({
                score:  inc,
                info:   'Voted YES on amendment 1450 extending implementation of USA Freedom Act by 1 year'
            });
            score += inc;
        }
        if (this.get('amendment_1451_gut_amicus') == 'GOOD') {
            var inc = 1;
            score_criteria.push({
                score:  inc,
                info:   'Voted NO on amendment 1451 to gut amicus proceedings'
            });
            score += inc;
        }
        else if (this.get('amendment_1451_gut_amicus') == 'BAD') {
            var inc = -3;
            score_criteria.push({
                score:  inc,
                info:   'Voted YES on amendment 1451 to gut amicus proceedings'
            });
            score += inc;
        }
        if (this.get('final_passage_usaf') == 'GOOD') {
            var inc = 4;
            score_criteria.push({
                score:  inc,
                info:   'Voted NO on USA Freedom Act (final passage)'
            });
            score += inc;
        }
        else if (this.get('final_passage_usaf') == 'OK') {
            var inc = 1;
            score_criteria.push({
                score:  inc,
                info:   'Voted YES on USA Freedom Act (final passage)'
            });
            score += inc;
        }
        else if (this.get('final_passage_usaf') == 'BAD') {
            var inc = -4;
            score_criteria.push({
                score:  inc,
                info:   'Voted NO on USA Freedom Act (final passage) and YES on extending the PATRIOT Act'
            });
            score += inc;
        }
        if (this.get('s_702_reforms') == 'X') {
            var inc = 4;
            score_criteria.push({
                score:  inc,
                info:   'Supported bills reforming Section 702 of FISA'
            });
            score += inc;
        }
        if (this.get('massie_lofgren_amendment_to_hr2685_defund_702') == 'GOOD') {
            var inc = 3;
            score_criteria.push({
                score:  inc,
                info:   'Voted YES on Massie-Lofgren Amendment to HR2685: Defund Section 702 surveillance'
            });
            score += inc;
        }
        else if (this.get('massie_lofgren_amendment_to_hr2685_defund_702') == 'BAD') {
            var inc = -3;
            score_criteria.push({
                score:  inc,
                info:   'Voted NO on Massie-Lofgren Amendment to HR2685: Defund Section 702 surveillance'
            });
            score += inc;
        }
        if (this.get('massie_lofgren_amendment_to_hr4870_no_backdoors') == 'GOOD') {
            var inc = 3;
            score_criteria.push({
                score:  inc,
                info:   'Voted YES on Massie-Lofgren Amendment to HR4870: Ban encryption backdoors'
            });
            score += inc;
        }
        else if (this.get('massie_lofgren_amendment_to_hr4870_no_backdoors') == 'BAD') {
            var inc = -3;
            score_criteria.push({
                score:  inc,
                info:   'Voted NO on Massie-Lofgren Amendment to HR4870: Ban encryption backdoors'
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
        else if (this.get('last_name') == 'McConnell'){
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
        
        if (a.get('last_name') < b.get('last_name'))
            return -1;
        if (a.get('last_name') > b.get('last_name'))
            return 1;
        return 0;
            
    },
});

var PoliticiansStateFilter = Composer.FilterCollection.extend({

    state: 'MA',

    filter: function(model) {
        return model.get('state_short') == this.state;
    }
});