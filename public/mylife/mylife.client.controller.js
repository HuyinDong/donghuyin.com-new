/**
 * Created by dongyin on 9/5/15.
 */
mylife.controller("mylifeController",function($scope,$http,$mdDialog){
    $scope.object = {};

    $scope.record = function(){
        $http.post('/data/mylife',$scope.object).then(function(data){
            if(data.data.msg == 'success'){
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title("Mylife")
                        .content("Success")
                        .ok("OK")

                ).finally(function(){
                    location.reload();
                });
            }
        });
    };

    $http.get('/data/mylife').then(function(data){

        var temp = data.data;

        var arr = _.map(temp, function(data){
            return {
                y: data.points,
                myData:data.records
            }
        })

        $(function () {
            $('#container').highcharts({
                title: {
                    text: 'My Life Record'
                },

                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        day: '%b %e'
                    }
                },
                yAxis : {
                    title: {
                        text: 'Points'
                    }
                },
                tooltip: {
                    dateTimeLabelFormats: {
                        day: '%b %e %Y'
                    },
                    formatter: function() {

                        return "The point is "+ this.point.y+". And the description: "+this.point.myData;
                    }
                },
                series: [{
                    name: 'Dong',
                    style: {
                        fontStyle: 'italic'
                    },
                    data: arr,
                    pointStart: Date.UTC(2016, 0, 1),
                    pointInterval: 36e5*24 // one hour
                }]
            });
        });
    });

});