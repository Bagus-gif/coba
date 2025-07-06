const { ethers } = require('ethers');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function generateWallets() {
    rl.question('How many wallets do you want to generate? ', async (answer) => {
        const totalWallets = parseInt(answer);

        if (isNaN(totalWallets) || totalWallets <= 0) {
            console.log('❌ Please enter a valid positive number.');
            rl.close();
            return;
        }

        let privateKeys = [];
        let addresses = [];

        console.log(`\n🔨 Generating ${totalWallets} wallet(s)...\n`);

        for (let i = 0; i < totalWallets; i++) {
            const wallet = ethers.Wallet.createRandom();

            const privateKey = wallet.privateKey.startsWith('0x')
                ? wallet.privateKey
                : `0x${wallet.privateKey}`;

            privateKeys.push(privateKey);
            addresses.push(wallet.address);

            console.log(`✅ Wallet ${i + 1}:`);
            console.log(`   Address: ${wallet.address}`);
            console.log(`   Private Key: ${privateKey}\n`);
        }

        // Save private keys
        fs.writeFileSync('wallet.txt', privateKeys.join('\n'), { flag: 'w' });
        console.log(`📝 Saved ${privateKeys.length} private keys to wallet.txt`);

        // Save addresses
        fs.writeFileSync('address.txt', addresses.join('\n'), { flag: 'w' });
        console.log(`📝 Saved ${addresses.length} addresses to address.txt`);

        rl.close();
    });
}

generateWallets();
