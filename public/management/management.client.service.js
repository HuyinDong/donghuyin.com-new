/**
 * Created by dongyin on 8/29/15.
 */

    management.factory('ManagementAPI',function($resource){
        return $resource(
            '/management/data/:table/:id',{
            },{
                update : {
                    method : 'put',
                    isArray : false
                },
                remove : {
                    method : 'delete',
                    params : {}
                },
                insert : {
                    method : 'post',
                },
                select : {
                    method : 'get'
                }
            }
        );
    });