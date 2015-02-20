'use strict';
/*global require, module, Hull, console*/
var assign = require('object-assign');
var Emitter = require('events').EventEmitter;


import intl from 'intl';
if(!window.Intl){
  window.Intl = intl;
}

var IntlMessageFormat = require('intl-messageformat');

var _ = require('underscore');

import React from 'react';

import Router from 'react-router';
var {RouteHandler, Route, Link} = Router

var EVENT = 'QUIZ_CHANGE';

var ACTIONS = [
  'finishQuiz',
  'getActions',
  'getNextStep',
  'getPrevStep',
  'getProviders',
  'getState',
  'linkIdentity',
  'login',
  'logout',
  'perform',
  'play',
  'removeChangeListener',
  'reset',
  'resetState',
  'resetTranslations',
  'resetUser',
  'selectQuizAnswer',
  'setQuizQuestion',
  'setActiveResource',
  'setRealtimeLeaderboard',
  'share',
  'signup',
  'submitForm',
  'translate',
  'unlinkIdentity'
];

var STATUS = {
  login: '_isLoggingIn',
  logout: '_isLoggingOut',
  linkIdentity: '_isLinking',
  unlinkIdentity: '_isUnlinking'
};

var Constants = {
  INTRODUCTION_STEP: 'introduction_step',
  PLAY_STEP: 'play_step',
  RESULT_STEP: 'result_step',
  LEADERBOARD_STEP: 'leaderboard_step',
  THANKS_STEP: 'thanks_step'
};

function isMobile() {
  var n = navigator.userAgent || navigator.vendor || window.opera;
  return !!/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(n) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(n.substr(0, 4));
}


function Engine(deployment) {
  this._ship = deployment.ship || deployment.deployable;
  this._platform = deployment.platform;
  this._orderBy = deployment.settings.orderBy || 'newest';
  this.resetState();
  var self=this;

  function onChange() {
    self.resetUser();
    self.emitChange();
  }

  Hull.on('hull.auth.*', onChange.bind(this));

  this.emitChange();
}

assign(Engine.prototype, Emitter.prototype, {
  addChangeListener: function(listener) {this.addListener(EVENT, listener);},
  removeChangeListener: function(listener) {this.removeListener(EVENT, listener);},
  emitChange: function(message) {this.emit(EVENT, message);},


  getActions: function() {
    if (this._actions) { return this._actions; }

    var instance = this;
    this._actions = ACTIONS.reduce(function(m, a) {
      m[a] = instance[a].bind(instance);
      return m;
    }, {});

    return this._actions;
  },


  resetState: function() {
    this.resetTranslations();
    this.resetUser();
    this._setInitialState(this._user,this._ship);
  },
  getState: function() {
    var self=this;
    _.map(this._quizzes, function(quiz){
      self.updateCurrentStep(quiz);
      self.updateCurrentQuestion(quiz);
    });

    var state = {

      user                 : this._user ? this._user : undefined,
      identities           : this._identities,
      providers            : this.getProviders(),
      error                : this._error,

      ship                 : this._ship,
      settings             : this._settings,
      resources            : this._resources,
      selectedResource     : this._selectedResource,

      isInitializing       : this._isInitializing,
      isWorking            : this._isLoggingIn || this._isLoggingOut || this._isLinking || this._isUnlinking,
      isLoggingIn          : this._isLoggingIn,
      isLoggingOut         : this._isLoggingOut,
      isLinking            : this._isLinking,
      isUnlinking          : this._isUnlinking,
      isReady              : !!this._isReady
    };
    return state;
  },

  _setInitialState: function(user, ship) {
    var self=this;

    this._settings = ship.settings;
    this._resources = this._ship.resources;

    // Add "key" inside the resources
    _.map(this._resources,function(v,k){v.key = k;});

    // Prepare resource collections filtered by type;
    this._quizzes = _.where(this._resources,{type:'quiz'});
    this._forms   = _.where(this._resources,{type:'form'});

    _.map(this._quizzes, function(quiz){
      self.resetQuizState(quiz);
      // self.updateLeaderboard(quiz);
      self.updateQuestions(quiz);
      self.updateCountdown(quiz);
      self.updateCurrentStep(quiz);
      self.updateCurrentQuestion(quiz);
      self.updateCurrentAnswers(quiz);
    });

    _.map(this._forms, function(form){
      self.resetFormState(form);
    });

    this._error = null;
    this._isLoggingIn = false;
    this._isLoggingOut = false;
    this._isLinking = false;
    this._isUnlinking = false;
  },


  resetQuizState: function(quiz){
    quiz.currentQuestionIndex = 0;
    quiz.answers = {};
    quiz.isStarted = false;
    quiz.startedAt = null;
    quiz.isFinished = false;
    quiz.finishedAt = null;
    return quiz;
  },
  updateQuestions: function(quiz){
    var questions = this._getQuestions(quiz);
    quiz._original_questions = quiz.questions;
    quiz.questions = questions;
    return quiz;
  },
  updateCurrentStep: function(quiz){
    var s = this._getStep(quiz)
    quiz.currentStep = s;
    return s;
  },
  updateCurrentAnswers: function(quiz){
    if(quiz && quiz.badge){
      quiz.answers = assign({},quiz.badge.data.answers);
      quiz.isFinished = true;
      quiz.isStarted = true;
    }
  },
  updateCurrentQuestion: function(quiz){
    var q= this._getCurrentQuestion(quiz)
    quiz.currentQuestion = q;
  },
  updateLeaderboard: function(quiz){
    Hull.api(quiz.id+'/leaderboards/score').then(function(res) {
      quiz.leaderboard=res;
      this.emitChange();
    }.bind(this), function(error) {
      // TODO handle API errors.
    });
    Hull.api(quiz.id+'/leaderboards/score',{type:'around_me'}).then(function(res) {
      quiz.leaderboard_around_me=res;
      this.emitChange();
    }.bind(this), function(error) {
      // TODO handle API errors.
    });
    Hull.api(quiz.id+'/leaderboards/score',{type:'friends'}).then(function(res) {
      quiz.leaderboard_friends=res;
      this.emitChange();
    }.bind(this), function(error) {
      // TODO handle API errors.
    });
  },
  updateCountdown: function(quiz){
    quiz.countdown = (this._settings.quiz_countdown > 0) && this._settings.quiz_countdown;
  },
  resetFormState: function(form){
    form.isSubmitted=false;
  },


  resetUser: function() {
    this._user = Hull.currentUser();
    this.getFriends();
    var identities = {};
    if (this._user) {
      this._user.identities.forEach(function(identity) {
        identities[identity.provider] = true;
      });
    }

    this._identities = identities;
  },


  getProviders: function() {
    var providers = [];

    var services = Hull.config().services.auth;
    for (var k in services) {
      if (services.hasOwnProperty(k) && k !== 'hull') {
        var provider = { name: k };
        provider.isLinked = !!this._identities[k];
        provider.isUnlinkable = provider.isLinked && this._user.main_identity !== k;

        providers.push(provider);
      }
    }

    return providers;
  },
  login: function(provider) {
    this.perform('login', provider);
  },
  logout: function() {
    Hull.logout();
  },
  signup: function(user) {
    return Hull.signup(user);
  },
  linkIdentity: function(provider) {
    this.perform('linkIdentity', provider);
  },
  unlinkIdentity: function(provider) {
    this.perform('unlinkIdentity', provider);
  },
  perform: function(method, provider) {
    var s = STATUS[method];

    this[s] = provider;
    this._error = null;

    this.emitChange();

    var options = { provider: provider };
    if (isMobile()) { options.strategy = 'redirect'; }
    if (this._platform.type === 'platforms/shopify') {
      options.redirect_url = document.location.origin + '/a/hull-callback';
    }
    // TODO add redirect to options

    var promise = Hull[method](options);
    promise.then(function() {
      this.resetUser();

      this[s] = false;
      this._error = null;

      this.emitChange();
    }.bind(this), function(error) {
      this[s] = false;

      error.provider = provider;
      this._error = error;

      this.emitChange();
    }.bind(this));

    return promise;
  },

  getFriends: function(){
    if(this._user){
      Hull.api(this._user.id+'/friends',function(friends){
        this._friends=friends;
      }.bind(this))
    }
  },


  share: function(provider) {
    Hull.share({
      provider: provider,
      method: 'share',
      anonymous: true,
      params: {
        display: 'popup',
        href: document.location.toString()
      }
    });
  },



  resetTranslations: function() {
    this._translations = {};
    var translations = this._ship.translations.en;
    for (var k in translations) {
      if (translations.hasOwnProperty(k)) {
        this._translations[k] = new IntlMessageFormat(translations[k], 'en-US');
      }
    }
  },
  translate: function(message, data) {
    var m = this._translations[message];
    if (m === null || m===undefined) { return message; }
    return m.format(data);
  },



  reset: function() {
    this.emitChange({ isLoading: 'reset' });
    Hull.api(this._ship.id).then(function(ship) {
      this._setInitialState(Hull.currentUser(), ship);
      this.emitChange();
    }.bind(this), function(error) {
      // TODO handle API errors.
    });
  },



  setActiveResource: function(resourceKey){
    this._selectedResource = this._resources[resourceKey];
    this.emitChange();
  },
  setQuizQuestion: function(quizKey, index) {
    var quiz = this._resources[quizKey];
    this._selectQuizQuestion(quiz, index);
    this.emitChange();
  },
  setRealtimeLeaderboard: function(quizKey, step){
    if(step === 'resource-leaderboard'){
      var self=this;
      var quiz = this._resources[quizKey];
      self.updateLeaderboard(quiz);
      this._leaderboardTicker = setInterval(()=>{
        self.updateLeaderboard(quiz);
      },2000);
    } else {
      if(this._leaderboardTicker){
        clearInterval(this._leaderboardTicker)
        this._leaderboardTicker = undefined;
      }
    }
  },




  /* 
    FORM ACTIONS
  */
  submitForm: function(formId, data) {
    var form = _.findWhere(this._forms,{id:formId});
    this.emitChange({ isLoading: 'form' });

    var r = Hull.api(form.id + '/submit' ,'put', { data: data });
    r.then(function(formResponse) {
      // WARNING. Will this work as expected ?
      form = assign(form,formResponse);
      form.isSubmitted = true;
      this.emitChange();
    }.bind(this), function(error) {
      this.emitChange({ error: error });
    }.bind(this));
  },

  /* 
    QUIZ ACTIONS
  */
  play: function(quizId, provider) {
    var quiz = _.findWhere(this._quizzes,{id:quizId});
    if (this._user) {
      this._startQuiz(quiz);
    } else if (provider) {
      this.emitChange({ isLoggingIn: true });
      Hull.login(provider).then(function() {
        this._user = Hull.currentUser();
        this._startQuiz(quiz);
      }.bind(this), function(error) {
        this.emitChange({ error: error });
      }.bind(this));
    } else {
      throw 'provider is missing...';
    }
  },
  selectQuizAnswer: function(quizId, answer) {
    var quiz = _.findWhere(this._quizzes,{id:quizId});
    quiz.answers[answer.questionRef] = answer.answerRef;
  },
  finishQuiz: function(resourceKey) {
    var quiz = this._resources[resourceKey];

    this._clearTicker(quiz);
    quiz.finishedAt = new Date();
    quiz.isSaving=true;  

    this.emitChange({ isLoading: 'quiz' });

    Hull.api(quiz.id + '/achieve' ,'post', {
      answers: quiz.answers,
      timing: quiz.finishedAt - quiz.startedAt
    }, function(badge) {
      quiz.isFinished = true;
      quiz.isSaving=false;
      quiz.badge = badge;
      this.updateCurrentAnswers(quiz);
      this.emitChange();
    }.bind(this));
  },
  getNextStep: function(resourceKey, step){
    var resource = this._resources[resourceKey];
    var i = this._getNextQuestionIndex(resource,step);
    if(i){return i;}
    return Constants.RESULT_STEP;
  },
  getPrevStep: function(resourceKey, step){
    var resource = this._resources[resourceKey];
    var i = this._getPreviousQuestionIndex(resource,step);
    if(i){return i;}
    return Constants.INTRODUCTION_STEP;
  },


  /* 
    QUIZ INTERNAL ACTIONS
  */
  _startQuiz: function(quiz) {
    quiz.isStarted = true;
    quiz.startedAt = new Date();

    this._startTicker(quiz);
    this.emitChange();
  },
  _prev: function(quiz) {
    var i = this._getPreviousQuestionIndex(quiz);
    if (i>=0) {
      this._selectQuizQuestion(quiz,i);
    }
  },
  _next: function(quiz) {
    var i = this._getNextQuestionIndex(quiz);
    if (i) {
      this._selectQuizQuestion(quiz,i);
    } else {
      this.finishQuiz(quiz.id);
    }
  },
  _getStep: function(quiz) {
    if (!this._user || !quiz.isStarted) {
      return Constants.INTRODUCTION_STEP;
    } else if (quiz.isFinished) {
      return Constants.RESULT_STEP;
    } else if (quiz.isStarted && !quiz.isFinished) {
      return Constants.PLAY_STEP;
    } else {
      throw 'This is not supposed to happen...';
    }
  },
  _selectQuizQuestion: function(quiz,index){
    index=parseInt(index);
    if(quiz){
      if (index >= 0 && index < quiz.questions.length) {
        quiz.currentQuestionIndex = index;
      } else {
        quiz.currentQuestionIndex=0;
        // throw 'index must be between 0 and ' + (quiz.questions.length - 1);
      }
    }
  },

  _getQuestions: function(quiz) {
    var questions = quiz.questions;
    if (this._settings.sample_questions > 0) {
      questions = _.sample(questions, this._settings.sample_questions);
    }

    return _.map(questions, function(q) {
      var answers = q.answers;
      if (this._settings.sample_answers > 0) {
        answers = _.sample(q.answers, this._settings.sample_answers);
      }
      q.answers = answers;
      q.countdown = (this._settings.question_countdown > 0) && this._settings.question_countdown;

      return q;
    }, this);
  },
  _getQuestion: function(quiz, index) {
    return quiz.questions[index];
  },
  _getCurrentQuestion: function(quiz){
    return this._getQuestion(quiz,quiz.currentQuestionIndex);
  },
  _getNextQuestionIndex: function(quiz,question=quiz.currentQuestionIndex) {
    return (parseInt(question) !== quiz.questions.length - 1) && parseInt(question) + 1;
  },
  _getPreviousQuestionIndex: function(quiz, question=quiz.currentQuestionIndex) {
    return (parseInt(question) > 0) && parseInt(question) - 1;
  },



  /* 
    QUIZ TIMER ACTIONS
  */

  _startTicker: function(quiz) {
    var self=this;
    quiz._ticker = setInterval(function(){
      self._tick(quiz)
    }, 1000);
  },
  _clearTicker: function(quiz) {
    clearInterval(quiz._ticker);
  },
  _tick: function(quiz) {
    // TODO This is not perfect...
    var emit = false;

    if (_.isNumber(quiz._countdown)) {
      if (quiz._countdown > 0) {
        emit = true;
        quiz._countdown--;
      } else if (quiz._countdown === 0) {
        this.finishQuiz(quiz.id);
      }
    }

    var q = this._getCurrentQuestion(quiz);
    if (_.isNumber(q.countdown)) {
      if (q.countdown > 0) {
        emit = true;
        q.countdown--;
      } else if (q.countdown === 0) {
        this._next(quiz);
      }
    }

    if (emit) { this.emitChange(); }
  }
});

Engine.Constants = Constants;

module.exports = Engine;
