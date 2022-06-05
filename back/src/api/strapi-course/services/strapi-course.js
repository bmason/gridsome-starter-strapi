'use strict';

/**
 * strapi-course service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::strapi-course.strapi-course');
