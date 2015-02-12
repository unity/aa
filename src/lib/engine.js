'use strict';
/*global require, module, Hull, console*/
var assign = require('object-assign');
var Emitter = require('events').EventEmitter;
var IntlMessageFormat = require('intl-messageformat');
var _ = require('underscore');

var EVENT = 'QUIZ_CHANGE';

var ACTIONS = [
  'finishQuiz',
  'getActions',
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
  'selectAnswer',
  'selectQuestion',
  'share',
  'signup',
  'submitForm',
  'translate',
  'unlinkIdentity'
];

var STATUS = {
  login: '_isLogingIn',
  logout: '_isLogingOut',
  linkIdentity: '_isLinking',
  unlinkIdentity: '_isUnlinking'
};

var Constants = {
  INTRODUCTION_STEP: 'introduction_step',
  PLAY_STEP: 'play_step',
  RESULT_STEP: 'result_step',
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
  getActions: function() {
    if (this._actions) { return this._actions; }

    var instance = this;
    this._actions = ACTIONS.reduce(function(m, a) {
      m[a] = instance[a].bind(instance);
      return m;
    }, {});

    return this._actions;
  },

  getState: function() {
    var state = {
      user                 : this._user ? this._user : undefined,
      identities           : this._identities,
      providers            : this.getProviders(),
      error                : this._error,
      ship                 : this._ship,
      settings             : this._settings,

      form                 : this._form,
      quiz                 : this._quiz,
      badge                : this._badge,
      questions            : this._questions,
      countdown            : this._countdown,
      currentStep          : this._getCurrentStep(),
      quizIsStarted        : this._quizIsStarted,
      quizStartedAt        : this._quizStartedAt,
      quizIsFinished       : this._quizIsFinished,
      quizFinishedAt       : this._quizFinishedAt,
      formIsSubmitted      : this._formIsSubmitted,
      currentQuestion      : this._getQuestion(this._currentQuestionIndex),
      currentQuestionIndex : this._currentQuestionIndex,
      answers              : this._answers,

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

  addChangeListener: function(listener) {
    this.addListener(EVENT, listener);
  },

  removeChangeListener: function(listener) {
    this.removeListener(EVENT, listener);
  },

  emitChange: function(message) {
    this.emit(EVENT, message);
  },




  resetState: function() {
    this.resetTranslations();
    this.resetUser();
    this._setInitialState(this._user,this._ship);
  },

  resetUser: function() {
    this._user = Hull.currentUser();

    var identities = {};
    if (this._user) {
      this._user.identities.forEach(function(identity) {
        identities[identity.provider] = true;
      });
    }

    this._identities = identities;
  },

  resetTranslations: function() {
    debugger
    this._translations = {};
    var translations = this._ship.translations.en;
    for (var k in translations) {
      if (translations.hasOwnProperty(k)) {
        this._translations[k] = new IntlMessageFormat(translations[k], 'en-US');
      }
    }
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




  translate: function(message, data) {
    var m = this._translations[message];
    if (m === null || m===undefined) { return message; }
    return m.format(data);
  },





  _setInitialState: function(user, ship) {
    this._quiz = this._ship.resources.quiz;
    this._form = this._ship.resources['profile-form'];
    this._badge = this._user && this._ship.resources.quiz.badge;
    this._settings = ship.settings;
    this._translations = ship.translations;
    this._questions = this._getQuestions();
    this._countdown = (this._settings.quiz_countdown > 0) && this._settings.quiz_countdown;
    this._currentQuestionIndex = 0;
    this._answers = {};
    this._quizIsStarted = false;
    this._quizStartedAt = null;
    this._quizIsFinished = false;
    this._quizFinishedAt = null;
    this._formIsSubmitted = false;

    this._error = null;
    this._isLoggingIn = false;
    this._isLoggingOut = false;
    this._isLinking = false;
    this._isUnlinking = false;
    this._isFavorite = null;
  },
  reset: function() {
    this.emitChange({ isLoading: 'reset' });

    Hull.api(this._ship.id).then(function(ship) {
      this._setInitialState(Hull.currentUser(), ship);
      this.emitChange();
    }.bind(this), function(error) {
      console.log(error);
      // TODO handle API errors.
    });
  },





  play: function(provider) {
    if (this._user) {
      this._startQuiz();
    } else if (provider) {
      this.emitChange({ isLoggingIn: true });

      Hull.login(provider).then(function() {
        this._user = Hull.currentUser();
        this._startQuiz();
      }.bind(this), function(error) {
        this.emitChange({ error: error });
      }.bind(this));
    } else {
      throw 'provider is missing...';
    }
  },
  selectAnswer: function(answer) {
    this._answers[answer.questionRef] = answer.answerRef;
    this._next();
  },
  selectQuestion: function(index) {
    if (index >= 0 && index < this._questions.length) {
      this._currentQuestionIndex = index;
      this.emitChange();
    } else {
      throw 'index must be between 0 and' + (this._questions.length - 1);
    }
  },
  finishQuiz: function() {
    this.emitChange({ isLoading: 'quiz' });

    this._clearTicker();

    this._quizFinishedAt = new Date();

    Hull.api(this._quiz.id + '/achieve' ,'post', {
      answers: this._answers,
      timing: this._quizFinishedAt - this._quizStartedAt
    }, function(badge) {
      this._quizIsFinished = true;
      this._badge = badge;

      this.emitChange();
    }.bind(this));
  },
  submitForm: function(data) {
    this.emitChange({ isLoading: 'form' });

    var r = Hull.api(this._form.id + '/submit' ,'put', { data: data });
    r.then(function(form) {
      this._form = form;
      this._formIsSubmitted = true;

      this.emitChange();
    }.bind(this), function(error) {
      this.emitChange({ error: error });
    }.bind(this));
  },




  _startQuiz: function() {
    this._quizIsStarted = true;
    this._quizStartedAt = new Date();

    this._startTicker();

    this.emitChange();
  },
  _next: function() {
    var i = this._getNextQuestionIndex();
    if (i) {
      this.selectQuestion(i);
    } else {
      this.finishQuiz();
    }
  },
  _getCurrentStep: function() {
    if (!this._user || !this._quizIsStarted) {
      return Constants.INTRODUCTION_STEP;
    } else if (this._formIsSubmitted) {
      return Constants.THANKS_STEP;
    } else if (this._quizIsFinished) {
      return Constants.RESULT_STEP;
    } else if (this._quizIsStarted && !this._quizIsFinished) {
      return Constants.PLAY_STEP;
    } else {
      throw 'This is not supposed to happen...';
    }
  },


  _getQuestions: function() {
    var questions = this._ship.resources.quiz.questions;
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
  _getQuestion: function(index) {
    return this._questions[index];
  },
  _getNextQuestionIndex: function() {
    return (this._currentQuestionIndex !== this._questions.length - 1) && this._currentQuestionIndex + 1;
  },
  _getPreviousQuestionIndex: function() {
    return (this._currentQuestionIndex > 0) && this._currentQuestionIndex - 1;
  },


  _startTicker: function() {
    this._ticker = setInterval(this._tick.bind(this), 1000);
  },
  _clearTicker: function() {
    clearInterval(this._ticker);
  },
  _tick: function() {
    // TODO This is not perfect...
    var emit = false;

    if (_.isNumber(this._countdown)) {
      if (this._countdown > 0) {
        emit = true;
        this._countdown--;
      } else if (this._countdown === 0) {
        this.finishQuiz();
      }
    }

    var q = this._getQuestion(this._currentQuestionIndex);
    if (_.isNumber(q.countdown)) {
      if (q.countdown > 0) {
        emit = true;
        q.countdown--;
      } else if (q.countdown === 0) {
        this._next();
      }
    }

    if (emit) { this.emitChange(); }
  }
});

Engine.Constants = Constants;

module.exports = Engine;
