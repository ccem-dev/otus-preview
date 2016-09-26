describe('SetupValidationStepService', function() {

  let Mock = {};
  let Injections = {};
  let service = {};
  let CAD1 = 'CAD1';

  beforeEach(function() {
    module('otusjs.player.core');

    inject(function(_$injector_) {
      mockItemData();
      mockActivityFacadeService(_$injector_);
      mockValidationService(_$injector_);
      mockElementRegisterFactory(_$injector_);
      service = _$injector_.get('otusjs.player.core.player.SetupValidationStepService', Injections);
    });
  });

  describe('effect method', function() {

    beforeEach(function() {
      spyOn(Mock.ActivityFacadeService, 'getCurrentItem').and.returnValue(Mock.itemData);
      spyOn(Mock.ElementRegisterFactory, 'create').and.returnValue(Mock.elementRegister);
      spyOn(Mock.ValidationService, 'registerElement');
      spyOn(Mock.elementRegister, 'addValidator');
      service.effect();
    })

    it('should retrieve the current item', function() {
      expect(Mock.ActivityFacadeService.getCurrentItem).toHaveBeenCalledWith();
    });

    it('should create an ElementRegister instance', function() {
      expect(Mock.ElementRegisterFactory.create).toHaveBeenCalledWith(Mock.itemData.customID, { data: {} });
    });

    it('should add a validator in ElementRegister instance for each filling rule option', function() {
      expect(Mock.elementRegister.addValidator).toHaveBeenCalled();
    });

    it('should register the ElementRegister instance in ValidationService', function() {
      expect(Mock.ValidationService.registerElement).toHaveBeenCalledWith(Mock.elementRegister);
    });

  });

  function mockItemData() {
    Mock.itemData = {
      "extents": "SurveyItem",
      "objectType": "TextQuestion",
      "templateID": "CAD1",
      "customID": "CAD1",
      "dataType": "String",
      "label": {
        "ptBR": {
          "extends": "StudioObject",
          "objectType": "Label",
          "oid": "",
          "plainText": "1. Qual é o seu nome?",
          "formattedText": "1. Qual é o seu nome?"
        },
        "enUS": {
          "extends": "StudioObject",
          "objectType": "Label",
          "oid": "",
          "plainText": "",
          "formattedText": ""
        },
        "esES": {
          "extends": "StudioObject",
          "objectType": "Label",
          "oid": "",
          "plainText": "",
          "formattedText": ""
        }
      },
      "metadata": {
        "extents": "StudioObject",
        "objectType": "MetadataGroup",
        "options": [{
          "extends": "StudioObject",
          "objectType": "MetadataAnswer",
          "dataType": "Integer",
          "value": 1,
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "Não quer responder",
              "formattedText": "Não quer responder"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          }
        }]
      },
      "fillingRules": {
        "extends": "StudioObject",
        "objectType": "FillingRules",
        "options": {
          "mandatory": {
            "extends": "StudioObject",
            "objectType": "Rule",
            "validatorType": "mandatory",
            "data": {
              "reference": true
            }
          },
          "minLength": {
            "extends": "StudioObject",
            "objectType": "Rule",
            "validatorType": "minLength",
            "data": {
              "size": null,
              "reference": 5
            }
          }
        }
      }
    };
  }

  function mockActivityFacadeService($injector) {
    Mock.ActivityFacadeService = $injector.get('otusjs.player.core.activity.ActivityFacadeService');
    Injections.ActivityFacadeService = Mock.ActivityFacadeService;
  }

  function mockValidationService($injector) {
    Mock.ValidationService = $injector.get('ValidationService');
    Injections.ValidationService = Mock.ValidationService;
  }

  function mockElementRegisterFactory($injector) {
    Mock.ElementRegisterFactory = $injector.get('ElementRegisterFactory');
    Mock.elementRegister = Mock.ElementRegisterFactory.create(Mock.itemData, { data: {} });
    Injections.ElementRegisterFactory = Mock.ElementRegisterFactory;
  }
});
