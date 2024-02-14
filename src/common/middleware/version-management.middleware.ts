import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class VersionManagementMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const VALID_VERSIONS = ['v1', 'v2']; // can be fetched from a config file

    // Extract the first segment of the path
    const firstPathSegment = req.originalUrl
      .split('/')[1]
      ?.toString()
      ?.toLowerCase();

    const versionPattern = /^v\d+/;

    // Check if the first segment is a version
    if (!versionPattern.test(firstPathSegment)) {
      // If not, prepend 'v1' to the path
      req.originalUrl = '/v1' + req.originalUrl;
    } else if (!VALID_VERSIONS.includes(firstPathSegment)) {
      // If an invalid version is detected e. v5 or v6, set to latest version ('v2' in this case)
      req.originalUrl = req.originalUrl.replace(firstPathSegment, 'v2');
      // notify the client that the version sent in the request is invalid
      res.locals.invalidVersion = true;
    }

    next();
  }
}
