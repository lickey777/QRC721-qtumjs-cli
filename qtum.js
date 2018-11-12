const Http = require('http');
const {Qtum} = require('qtumjs');

const repo = require('./solar.development.json');
const qtum = new Qtum('http://liqi:qtum@127.0.0.1:13889', repo);
const contract = qtum.contract('QRC721.sol');

const LRU = require("lru-cache")
let cache = LRU({maxAge: 1000 * 60 * 60 * 24})

async function getData() {
    let res = {}
    let temp;
    let index;
    let data;

    // get name
    data = await contract.call('name');
    res['name'] = data['outputs'][0];

    // get symbol
    data = await contract.call('symbol');
    res['symbol'] = data['outputs'][0];

    // get index
    data = await contract.call('totalSupply');
    index = data['outputs'][0].toNumber();
    res['index'] = index;

    // get tokenId
    res['tokenId'] = []
    for(let i = 0; i < index; i++){
        data = await contract.call('tokenByIndex',[i]);
        res['tokenId'].push(data['outputs'][0].toNumber());
    }

    // get tokenOwner
    res['tokenOwner'] = []
    for(let i = 0; i < index; i++){
        temp = res['tokenId'][i];
        data = await contract.call('ownerOf',[temp]);
        res['tokenOwner'].push(data['outputs'][0]);
    }

    // get tokenURI
    res['tokenURI'] = []
    for(let i = 0;i < index; i++){
        temp = res['tokenId'][i];
        data = await contract.call('tokenURI',[temp]);
        res['tokenURI'].push(data['outputs'][0]);
    }

    console.log('name:',res['name'],',   ','symbol:',res['symbol'],',   ','index:',res['index'])
    console.log('tokenId','        ','tokenOwner','                      ','tokenURI')

    for(let i = 0; i < index; i++){
        console.log('  ',res['tokenId'][i],' ',res['tokenOwner'][i],'   ',res['tokenURI'][i])
    }

    return res;
}

function cacheData() {
    getData().then(function(data){
        cache.set("data", JSON.stringify(data))
    })
}
cacheData();
setInterval(cacheData, 10000);

Http.createServer(function (req, res) {
    res.write(cache.get('data'));
    res.end();
}).listen(9821);


