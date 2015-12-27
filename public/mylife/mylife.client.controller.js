/**
 * Created by dongyin on 9/5/15.
 */
mylife.controller("mylifeController",function($scope,$http){
    $scope.object = {};

    $scope.record = function(){
        $http.post('/data/mylife',$scope.object).then(function(data){
            console.log(data);
        });
    };

    $http.get('/data/mylife').then(function(data){
        /*var points =[];
        var records = [];
        console.log(data);
        for(var i = 0 ; i < data.data.length;i++){
            points.push(data.data[i].points);
            records.push(data.data[i].records);
        }
        console.log(records);
        */
        var temp = data.data;

        var arr = _.map(temp, function(data){
            return {
                y: data.points,
                myData:data.records
            }
        })

        console.log(arr);
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