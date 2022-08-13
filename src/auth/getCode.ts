import http from 'http';
import fs from 'fs';
import 'cross-fetch/polyfill';
import fetch from 'cross-fetch';
import open from 'open';
import * as url from 'url';
import * as keytar from 'keytar';
const FormData = require('form-data');

const PORT = 3000;

export const getCode = (): Promise<string> => {
  return new Promise<string>((resolve) => {
    fs.readFile('./src/auth/auth.html', (err, html) => {
      http
        .createServer(async (req, res) => {
          if (!req.url) {
            return;
          }
          const { code } = url.parse(req.url, true).query;
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write(html);
          res.end();

          const data = new FormData();
          data.append('client_id', process.env.CLIENT_ID!);
          data.append('client_secret', process.env.CLIENT_SECRET!);
          data.append('code', code);
          data.append('state', 'abc');
          data.append('redirect_uri', 'http://localhost:3000');

          const { access_token } = await fetch(
            'https://github.com/login/oauth/access_token',
            {
              method: 'POST',
              body: data,
              headers: {
                Accept: 'application/json',
              },
            }
          ).then((res) => res.json());

          await keytar.setPassword(
            'github',
            process.env.CLIENT_ID!,
            access_token
          );
          resolve(access_token);
        })
        .listen(PORT);
    });

    open(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user%20read:org%20public_repo%20admin:enterprise&state=abc`
    );
  });
};
