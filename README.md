## copy

- crowdfund-dapp 에서 작성한 ethereum 폴더 안의 `compile.js`, `deploy.js`, `/contracts/campaign.sol`를 지금의 repo안의 ethereum폴더 안으로 복사한다.

## compile

- `node compile.js`명령어로 컴파일을 한다.

## deploy

- `node deploy.js` 명령어로 배포를 한다.
- 배포한 컨트랙트 주소를 복사해둔다.

## fix

- `/ethereum`폴더안의 파일을 수정한다.
- `/ethereum/factory.js`
```javascript
import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '배포하고난 결과의 컨트랙트 주소를 넣는다.'
);

export default instance;
```

- `/ethereum/web3.js`
```javascript
import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined' ) {
  web3 = new Web3(window.web3.currentProvider);
} else {
  const provider = new Web3.providers.HttpProvider(
    'infura에서 받은 ROPSTEN 주소를 넣는다.'
  );
  web3 = new Web3(provider);
}
// const web3 = new Web3(window.web3.currentProvider);

export default web3;
```

## run

- 루트폴더에서 `npm run dev` 명령어로 서버를 실행 시키고
- `localhost:3000`에서 확인한다.