//
// Imports
//

import { isLocalIpAddress } from "@donutteam/utilities";
import { FritterMiddlewareFunction } from "@fritter/core";

//
// Class
//

/** A class for creating a middleware that forces SSL. */
export class FritterForceSSLMiddleware
{
	/** The middleware function. */
	public readonly execute : FritterMiddlewareFunction;

	/** Creates a new instance of the middleware. */
	constructor()
	{
		this.execute = async (context, next) =>
		{
			if (context.fritterRequest.isSecure() || isLocalIpAddress(context.fritterRequest.getIp()))
			{
				return await next();
			}

			const url = new URL(context.fritterRequest.getUrl());

			url.protocol = "https:";

			context.fritterResponse.setRedirect(url.toString());
		};
	}
}