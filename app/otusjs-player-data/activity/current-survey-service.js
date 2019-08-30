(function () {
  'use strict';

  angular
    .module('otusjs.player.data.activity')
    .service('otusjs.player.data.activity.CurrentSurveyService', Service);

  Service.$inject = [
    'otusjs.model.activity.ActivityFacadeService'
  ];

  function Service(ActivityFacadeService) {
    var self = this;

    /* Public Interface */
    self.getSurvey = getSurvey;
    self.getAnswerByItemID = getAnswerByItemID;
    self.getItems = getItems;
    self.getNavigations = getNavigations;
    self.getNavigationByOrigin = getNavigationByOrigin;
    self.getItemByCustomID = getItemByCustomID;
    self.getItemByTemplateID = getItemByTemplateID;
    self.getGroupItemsByMemberID = getGroupItemsByMemberID;
    // self.getSurveyItemGroup = getSurveyItemGroup;
    self.getSurveyDatasources = getSurveyDatasources;
    self.getStaticVariableList = getStaticVariableList;
    self.initialize = initialize;
    self.finalize = finalize;
    self.save = save;
    self.setup = setup;
    self.clearSkippedAnswers = clearSkippedAnswers;
    self.getNavigationTracker = getNavigationTracker;
    self.getWholeTemplateStaticVariableList = getWholeTemplateStaticVariableList;

    function getSurvey() {
      return ActivityFacadeService.surveyActivity;
    }

    function getSurveyDatasources() { //question datasources
      return getSurvey().getDataSources();
    }

    function getStaticVariableList() {
      return getSurvey().getStaticVariableList();
    }

    function getAnswerByItemID(id) {
      return ActivityFacadeService.getFillingByQuestionID(id);
    }

    function getItems() {
      return ActivityFacadeService.surveyActivity.getItems();
    }

    function getItemByCustomID(customID) {
      var fetchedItem = null;

      getItems().some(function (item) {
        if (item.customID === customID) {
          fetchedItem = item;
          return true;
        }
      });

      return fetchedItem;
    }

    // function getItemByTemplateID(templateID) {
    //   return getItems().find(function (item) {
    //     return item.templateID === templateID;
    //   });
    // }

    function getItemByTemplateID(templateID) {
      var fetchedItem = null;
      getItems().some(function (item) {
        if(item.templateID === templateID){
          fetchedItem = item;
          return true;
        }
      });
      return fetchedItem;
    }

    function getGroupItemsByMemberID(id) {
      return getFake(id);
      // return getSurvey().getGroupItemsByMemberID(id);
    }

    function getFake(id) {
      console.log(getSurvey());
      return getSurvey().getSurveyItemGroupList(id).members.map(member => {
        return getItemByTemplateID(member.id);
        // return member.id;
      });

      // return getSurvey().getSurveyItemGroupList().getGroupByMember(id).members.map(member => {
      //   return getItemByTemplateID(member.id);
      // });
    }

    // function getSurveyItemGroup() {
    //   // return getSurvey().SurveyItemGroupManager.getGroupMember();
    // }

    function getNavigations() {
      return ActivityFacadeService.surveyActivity.getNavigations();
    }

    function getNavigationByOrigin(origin) {
      var fetchedNavigation = null;

      getNavigations().some(function (navigation) {
        if (navigation.origin === origin) {
          fetchedNavigation = navigation;
          return true;
        }
      });

      return fetchedNavigation;
    }

    function initialize() {
      ActivityFacadeService.initializeActivitySurvey();
    }

    function finalize() {
      ActivityFacadeService.finalizeActivitySurvey();
    }

    function save() {
      ActivityFacadeService.saveActivitySurvey();
    }

    //todo: ver se alguém chama esse método
    function setup() { }

    function clearSkippedAnswers() {
      ActivityFacadeService.clearSkippedAnswers();
    }

    function getNavigationTracker() {
      return ActivityFacadeService.getNavigationTracker();
    }

    function getWholeTemplateStaticVariableList() {
      return ActivityFacadeService.getWholeTemplateVariableList();
    }

  }
}());
