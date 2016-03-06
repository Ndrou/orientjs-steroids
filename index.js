"use strict";
var OrientDB = require('orientjs');
var fs = require('fs');
var glob = require('glob');
var Handlebars = require('handlebars');
var path = require('path');
var Promise = require('bluebird');

var templates = {};

OrientDB.Db.prototype.loadTemplates = function(opts){

    if (opts && opts.path){

        var files = glob.sync('**/*.hbs', { cwd : opts.path });

        files.forEach(function(file){
            var tplName = path.join(path.dirname(file), path.basename(file, '.hbs')).split(path.sep).join('/');
            var filePath = path.join(opts.path, file);
            var fileContent = fs.readFileSync(filePath).toString();

           templates[tplName] = Handlebars.compile(fileContent);
        });

    }

};

OrientDB.Db.prototype.queryTemplate = function(templateName, templateContext, options){

    if (typeof templates[templateName] !== "function"){
        return Promise.reject(new Error('Template \'' + templateName + '\' not found'));
    }

    var sqlQuery = templates[templateName](templateContext);
    return this.query(sqlQuery, options);

};

OrientDB.Db.prototype.batchQueryTemplate = function(templateName, templateContext, options){
    var sqlQuery = templates[templateName](templateContext);

    options = options || {};
    options['class'] = 's';

    return this.query(sqlQuery, options);
};

module.exports = OrientDB;