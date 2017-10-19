// Nicholas Read 
// Block chaing program for myself
// MIT licence
// This is my first block chain attempt in JS 

class Block{
	construntor(index, pHash, timestamp, data, hash){
		this.index = index;
		this.pHash = pHash.toString();
		this.timestamp = timestamp;
		this.data = data;
		this.hash = hash.toString();
	}
}

var clculateHash = (index, pHash, timestamp, data) => {
	return CryptoJS.SHA256(index + pHash + timestamp + data).toString();
};

var generatNextBlock = (blockData) => {
	var pBlock = getLatestBlock();
	var nextIndex = previousBlock.index +1;
	var nextTime = new Date().getTime() /1000;
	var nextHash = clculateHash(nextIndex, previousBlock.hash, nextTime, blockData);
	return new Block(nextIndex, previousBlock.hash,nextTime,blockData,nextHash);
};

var getGenBlock = () => {
	return new Block(0,"0", 1465154705, "my genesis block!!","816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7");
};
var blockchain = [getGenBlock()];

var isValidNewBlock = (newBlock, pBlock) => {
	if (pBlock.index+1 !== newBlock.index){
		console.log('invalid index');
		return false;
	} else if (previousBlock.hash !== newBlock.pHash){
		console.log('invalid previous Hash');
		return false;
	} else if (clculateHash(newBlock) !== newBlock.hash) {
		console.log('invalid hash: ' + clculateHash(newBlock)+ ' ' + newBlock.hash);
		return false;
	}
	return true;
};

var replaceChain = (newBlock) => {
	if (isValidChain(newBlock) && newBlock.length > blockchain.length){
		console.log('Received blockchain is valid. Replacing current blockchain');
		blockchain = newBlock;
		broadcast(responseLatesMsg());
	} else{
		console.log('Received blockchain invalid');
	}
};


var initHttpServer = () => {
    var app = express();
    app.use(bodyParser.json());

    app.get('/blocks', (req, res) => res.send(JSON.stringify(blockchain)));
    app.post('/mineBlock', (req, res) => {
        var newBlock = generateNextBlock(req.body.data);
        addBlock(newBlock);
        broadcast(responseLatestMsg());
        console.log('block added: ' + JSON.stringify(newBlock));
        res.send();
    });
    app.get('/peers', (req, res) => {
        res.send(sockets.map(s => s._socket.remoteAddress + ':' + s._socket.remotePort));
    });
    app.post('/addPeer', (req, res) => {
        connectToPeers([req.body.peer]);
        res.send();
    });
    app.listen(http_port, () => console.log('Listening http on port: ' + http_port));
};



















