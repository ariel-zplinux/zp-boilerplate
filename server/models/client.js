'use strict';

module.exports = function(Client) {
  Client.observe('access', function filterProperties(ctx, next) {
    const {
      pagination,
      limit,
      skip,
      params
    } = ctx.options;

    // handle pagination
    if (pagination && (limit > 0) && (skip >= 0)) {
      ctx.query.limit = parseInt(limit);
      ctx.query.skip = parseInt(skip)
    }

    // handle search filter
    const { name, email, quantity } = params;

    if (name || email) {
      // and[] of 1 element is ok
      ctx.query.where = {}
      ctx.query.where.and = [];

      if (name) {
        const nameFilter = {
          "fullname": {
            like: `.*${name}.*`,
            options:"i"
          }
        };

        ctx.query.where.and.push(nameFilter)
      }

      if (email) {
        // 2 email fields in Client model
        const emailFilter = {or: [
          {"email": email},
          {"email2": email}
        ]};

        ctx.query.where.and.push(emailFilter)
      }

      // TODO
      // - field quantity to create in Client
      // - Client.quantity to increase at each Lot created
      if (quantity) {
        const quantityFilter = {
          "quantity": quantity
        };

        // ctx.query.where.and.push(quantityFilter)
      }
    }

    next();
  });

  Client.createOptionsFromRemotingContext = function(ctx) {
    // add params from HTTP request to ctx.options in 'access' hook.
    const {
      pagination = false,
      limit = 0,
      skip = 0,
      params = "{}"
    } = ctx.req.query;

    // add Loopback internal things like token
    const base = this.base.createOptionsFromRemotingContext(ctx);

    return Object.assign(base, {
      currentUserId: base.accessToken && base.accessToken.userId,
      pagination,
      limit,
      skip,
      params: JSON.parse(params)
    });
  };
};
