/**
 * Created by dongyin on 8/30/15.
 */
management.controller('dialogController',
    function($mdDialog,$scope){
    $scope.showAlert = function(dialogTitle,dialogContent,dialogButton){
        $mdDialog.show(
            $mdDialog.alert()
                .clickOutsideToClose(true)
                .title(dialogTitle)
                .content(dialogContent)
                .ariaLabel('Alert Dialog Demo')
                .ok(dialogButton)

        );
    }

});