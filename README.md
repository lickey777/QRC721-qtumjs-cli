# QRC721-qtumjs-cli
A NodeJS CLI Tool For QRC721 Token

# Summary
We will use qtumjs to build a NodeJS CLI tool to interact with the deployed QRC721 token.

See [How to issue a QRC721 token](https://github.com/lickey777/QRC721)

And qtumjs relies on qtumd's RPC service, so just keep Qtum-qt or Qtumd open：
```
/Applications/Qtum-Qt.app/Contents/MacOS/Qtum-Qt -testnet -server -rpcuser=XXX -rpcpassword=XXX -rpcport=13889
```
-testnet : link to Qtum testnet.

-server : open RPC server.

-rpcuser -rpcpassword -rpcport : RPC setting, Qtum testnet rpcport is 13889 in defult.


# Quick Start

```
$ mkdir&&cd QRC721-CLI

$ git clone https://github.com/lickey777/QRC721-qtumjs-cli

$ cd QRC721-qtumjs-cli

$ npm install

$ node qtum.js

```