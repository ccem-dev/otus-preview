(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.HandleValidationErrorStepService', Service);

  Service.$inject = [
    'otusjs.player.core.activity.ActivityFacadeService'
  ];

  function Service(ActivityFacadeService) {
    let self = this;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {
    }

    function effect(pipe, flowData) {
      ActivityFacadeService.attachItemValidationError(flowData.validationResult);
    }

    function afterEffect(pipe, flowData) {
      if (flowData.validationResult.hasError) {
        pipe.isFlowing = false;
      }
      delete flowData.validationResult;
    }

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();
