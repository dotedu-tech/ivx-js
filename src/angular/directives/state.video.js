import createFactoryFunction from '../utilities/create-factory-function.js';
import VideoStateController from '../controllers/state.video.js';
import VideoEventConstants from "../../constants/video.events.js";

class VideoState {
    constructor($compile, $state, $sce, $timeout, iVXjs, iVXjsBus, iVXjsUIModule, createInlineVideo, pullInTemplate, ivxExperienceScope, iVXjsStateCreator, iVXjsVideoService) {
        this.template = this.templateHTML;
        this.restrict = 'E';
        this.replace = true;
        this.scope = {
            stateData: "=stateData"
        }
        this.controller = VideoStateController
        this.controllerAs = 'vm';
        this.link = ($scope, iElm, iAttrs, controller) => {
            let data = angular.copy($scope.stateData);

            controller.stateData = data;

            let { id, playerType = "html5", playerSettings = {}, embeddedStates = [], embedded, cuePoints = [], personalizations = [], header = {}, footer = {} } = data;
            let { vimeoId, youtubeId, inlineSrc, iphoneInline = false, controls } = angular.copy(playerSettings);
            const playerId = playerSettings.id ? playerSettings.id : `${id}-video-player`;
            let controlsHTML = iVXjsVideoService.getControlHTML(playerId, controls);

            if (vimeoId) playerType = 'vimeo';
            if (youtubeId) playerType = 'youtube';
            if (createInlineVideo.isiOS() && iphoneInline && inlineSrc) {
                playerType = 'html5';
                playerSettings.src = inlineSrc;
                data.isIphone = true;
            }

            controller.controls = controls;

            let personalizationsHTML = personalizations.reduce((personalizationHTML, thisPersonalization, index) => {
                thisPersonalization = pullInTemplate.convertTemplateUrlToHtml(thisPersonalization, $scope);

                let { defaultAnimationClass = 'hide', html, id } = thisPersonalization;

                return `${personalizationHTML} <div id="${id}" class="${defaultAnimationClass} ivx-video-personalization">${html}</div> `
            }, "");

            controller.playerId = playerId;

            let videoPlayerHTML = `
               <ivxjs-${playerType}-video-player player-id='${playerId}' settings="vm.stateData.playerSettings" state-data="vm.stateData"></ivxjs-${playerType}-video-player>
               ${controlsHTML}
               ${personalizationsHTML}
            `;

            data = pullInTemplate.convertHeaderFooter(header, footer, data, controller);

            let videoFramework = new iVXjsUIModule.states.video(videoPlayerHTML, data);

            $scope.experience = ivxExperienceScope.setScopeExperience(iVXjs.experience);

            iElm.html(videoFramework.html);

            if (!embedded && embeddedStates.length > 0) {
                iVXjsStateCreator.addViews(embeddedStates, iElm);
            }

            $compile(iElm.contents())($scope, (compiled) => {
                iElm.html(compiled);

                if (createInlineVideo.isMobile() || createInlineVideo.isiOS()) {
                    let videoEventNames = new VideoEventConstants();
                    $timeout(() => {
                        let player = {};

                        if (playerType === 'html5') {
                            player = iElm.find('video')[0];
                        }

                        iVXjsBus.emit(videoEventNames.CAN_PLAY, player);
                    }, 500);
                }
            });

            $scope.$on('$destroy', () => {
                let videoEventNames = new VideoEventConstants();

                iVXjsBus.removeListener(videoEventNames.ENDED, controller.videoEnded);
            })


        }
    }

    get templateHTML() {
        return `<div class="video-state-container"></div>`;
    }
}

VideoState.$inject = ['$compile', '$state', '$sce', '$timeout', 'iVXjs', 'ivxjs.bus', 'ivxjs.modules.ui', 'createInlineVideo', 'pullInTemplate', 'ivxExperienceScope', 'ivxjsStateCreator', 'iVXjsVideoService'];

export default angular
    .module('ivx-js.directives.state.video', [])
    .directive('ivxjsVideoState', createFactoryFunction(VideoState))
    .name;