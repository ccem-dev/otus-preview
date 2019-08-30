(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusPlayerDisplay', {
      templateUrl: 'app/otusjs-player-component/player-display/player-display-template.html',
      controller: Controller,
      bindings: {
        goBack: "&"
      }
    });

  Controller.$inject = [
    '$scope',
    '$document',
    '$element',
    '$compile',
    '$location',
    '$anchorScroll',
    'otusjs.player.data.activity.ActivityFacadeService',
    'otusjs.player.core.player.PlayerService'
  ];

  function Controller($scope, $document, $element, $compile, $location, $anchorScroll, ActivityFacadeService, PlayerService) {
    var self = this;

    var SURVEY_ITEM = '<otus-survey-item item-data="itemData" id="{{itemData.templateID}}" style="margin: 0;display:block;" class="animate-switch"/>';
    // var SURVEY_ITEM_GROUP = '<otus-survey-item-group item-data="itemData" style="margin: 0;display:block;" class="animate-switch"/>';
    var SURVEY_COVER = '<otus-cover />';

    /* Public methods */
    self.loadItem = loadItem;
    self.showCover = showCover;
    self.remove = remove;
    self.$onInit = onInit;
    self.ids = [];

    function _destroyCurrentItem() {
      if (self.currentItem) {
        self.currentItem.destroy();
      }
    }

    function loadItem(itemsData) {
      // if (_shouldLoadItem(itemsData)) {
      //   _destroyCurrentItem();
      //   _saveQuestion();
      //   removeQuestion(itemsData.templateID);
      //   $scope.itemData = itemsData;
      //   _setQuestionId(itemsData.templateID);
      //   $element.find('#pagePlayer').empty();
      //   $element.find('#pagePlayer').append($compile(SURVEY_ITEM)($scope));
      //   _onGoBottom(itemsData.templateID);
      // }
      if (_shouldLoadItem(itemsData[0])) {
        _destroyCurrentItem();
        _saveQuestion();
        removeQuestion(itemsData.templateID);

        $element.find('#pagePlayer').empty();
        for (let i = 0; i < itemsData.length; i++) {
          (function () {
            let scope = $scope.$new();
            scope.itemData = itemsData[i];
            _setQuestionId(itemsData[0].templateID);
            let element = $compile(SURVEY_ITEM)(scope);
            console.log(element);
            $element.find('#pagePlayer').append(element);
          }())
        }
        _onGoBottom(itemsData.templateID);
      }

      //
      // _destroyCurrentItem();
      // $element.find('#pagePlayer').empty();
      // $element.find('#pagePlayer').append($compile(SURVEY_ITEM_GROUP)($scope));


      if (PlayerService.isGoingBack()) {
        if (PlayerService.getGoBackTo() !== itemsData.templateID) {
          self.goBack();
        } else {
          PlayerService.setGoBackTo(null);
        }
      }
    }

    $scope.removeQuestion = removeQuestion;

    function removeQuestion(id) {
      var index = _getIndexQuestionId(id);
      if (index > -1) {
        var length = $scope.questions.length;
        $scope.questions.splice(index, length);
        self.ids.splice(index, length);

      } else {
        return false;
      }
      return true;

    }

    function _setQuestionId(id) {
      self.ids.push(id);
    }

    function _getIndexQuestionId(id) {
      return self.ids.indexOf(id);
    }

    function _onGoBottom(idQuestion) {
      $location.hash(idQuestion);
      $anchorScroll();
    }

    function _saveQuestion() {
      if ($scope.itemData.templateID) {
        var question = angular.copy($scope.itemData);
        question.data = ActivityFacadeService.fetchItemAnswerByTemplateID(question.templateID);
        question.data = question.data ? question.data : _setAnswerBlank();
        $scope.questions.push(question);
      }
    }

    function _setAnswerBlank() {
      return {
        metadata: {
          value: null
        },
        answer: {
          value: null
        }
      };
    }

    function showCover() {
      _destroyCurrentItem();
      $element.find('#pagePlayer').empty();
      $element.find('#pagePlayer').append($compile(SURVEY_COVER)($scope));
    }

    function remove() {
      $element.find('#pagePlayer').remove();
    }

    function onInit() {
      $scope.$parent.$ctrl.playerDisplay = self;
      $scope.itemData = {};
      $scope.itemData.customID = '';
      $scope.questions = [];
    }

    function _shouldLoadItem(itemData) {
      return $scope.itemData && $scope.itemData.customID !== itemData.customID;
    }
  }
}());
