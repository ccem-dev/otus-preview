(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.PostAheadActionService', Service);

  Service.$inject = [
    'otusjs.player.core.player.ChainFactory',
    'otusjs.player.core.player.ChainLinkFactory'
  ];

  function Service(ChainFactory, ChainLinkFactory) {
    let self = this;
    let _stepChain = ChainFactory.create();

    self.isFlowing = true;

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      let link = ChainLinkFactory.create();
      link.catchFlowData(step.catchPreData);
      link.setPreExecute(step.beforeEffect);
      link.setExecute(step.effect);
      link.setPostExecute(step.afterEffect);
      link.setResult(step.getEffectResult);
      _stepChain.chain(link);
    }

    function execute(phaseData) {
      if (phaseData.pipe.isFlowing) {
        self.isFlowing = phaseData.pipe.isFlowing;
        self.flowData = phaseData.flowData;
        return _stepChain.execute(self, self.flowData);
      } else {
        return phaseData;
      }
    }

    function stopFlow() {
      self.isFlowing = false;
    }
  }
})();
