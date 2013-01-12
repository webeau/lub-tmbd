/**
 * Created with JetBrains WebStorm.
 * User: gnalFF
 * Date: 11.01.13
 * Time: 21:14
 * To change this template use File | Settings | File Templates.
 */
angular.module('lub-tmdb-api-search', ['lub-tmdb-config', 'lub-tmdb-apiKey'])
    .factory('lubTmdbApiSearch', function ($q, lubTmdbConfig, lubTmdbApiKey, $http) {
        var get = function (query, type, options) {
            options = options || {};
            var defer = $q.defer();
            var url = lubTmdbConfig.baseURL + 'search/' + type;
            $http({
                method:'jsonp',
                url:url,
                params:angular.extend({api_key:lubTmdbApiKey, query:query}, options),
                cache:options.cache
            }).success(function (result) {
                    defer.resolve(result);
                }).error(function (result) {
                    defer.reject(result);
                });
            return defer.promise;
        }
        return {
            movie:function (query, options) {
                return get(query, 'movie', options);
            },
            collection:function (query, options) {
                return get(query, 'collection', options);
            },
            person:function (query, options) {
                return get(query, 'person', options);
            },
            list:function (query, options) {
                return get(query, 'list', options);
            },
            company:function (query, options) {
                return get(query, 'company', options);
            },
            keyword:function (query, options) {
                return get(query, 'keyword', options);
            }
        }
    })