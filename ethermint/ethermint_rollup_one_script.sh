#!/bin/bash
echo -e "------BEGIN SETUP ENVIROMENT FOR DEPLOYING ROLLUP---------";
IP_ADDRESS=$(hostname -I | cut -d' ' -f1)
echo "#############------------===YOUR IP ADDRESS: $IP_ADDRESS"

echo "#############------------===SYSTEM UPDATE"
sudo apt-get update -y
sudo apt install sudo -y
sudo apt install systemd -y

echo "#############------------INSTALL LIB, GIT & GO"
sudo apt install curl tar wget clang pkg-config libssl-dev jq build-essential git make ncdu -y
ver="1.20" 
cd $HOME 
wget "https://golang.org/dl/go$ver.linux-amd64.tar.gz" 
sudo rm -rf /usr/local/go 
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz" 
sudo rm "go$ver.linux-amd64.tar.gz"
echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> $HOME/.bash_profile
source $HOME/.bash_profile

sudo apt install git

echo "#############------------INSTALL CELESTIA LIGHT NODE"
cd $HOME 
rm -rf celestia-node 
git clone https://github.com/celestiaorg/celestia-node.git
cd celestia-node/ 
git checkout tags/v0.9.1

make build 
sudo make install 
make cel-key

echo "#############------------INIT BLOCKSPACE RACE"
celestia light init --p2p.network blockspacerace

echo "#############------------CREATE SERVICE TO RUN NODE BY SYSTEMD"
sudo tee /etc/systemd/system/celestia-lightd.service <<EOF >/dev/null
[Unit]
Description=celestia-lightd Light Node
After=network-online.target

[Service]
User=$USER
ExecStart=/usr/local/bin/celestia light start --core.ip https://rpc-blockspacerace.pops.one/ --keyring.accname my_celes_key --gateway --gateway.addr localhost --gateway.port 26659 --p2p.network blockspacerace --metrics.tls=false --metrics --metrics.endpoint localhost:4318
Restart=on-failure
RestartSec=3
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
EOF

cat /etc/systemd/system/celestia-lightd.service
sudo systemctl enable celestia-lightd
sudo systemctl start celestia-lightd

sleep 10

echo "#############------------GET NODE INFORMATION"
NODE_TYPE=light
AUTH_TOKEN=$(celestia $NODE_TYPE auth admin --p2p.network blockspacerace)
NODE_INFO=$(curl -X POST \
 -H "Authorization: Bearer $AUTH_TOKEN" \
 -H 'Content-Type: application/json' \
 -d '{"jsonrpc":"2.0","id":0,"method":"p2p.Info","params":[]}' \
 http://localhost:26658;)
NODE_ID=$(echo "$NODE_INFO" | jq -r '.result.ID')
echo -e "\nThe celestia light-node was installed successfully!"
echo -e "\nYour light-node id: $NODE_ID"

echo "#############------------INSTALL THE ETHERMINT ROLLUP"


echo "#############------------INSTALL ETHERMINT"
cd $HOME 
git clone https://github.com/celestiaorg/ethermint.git
cd ethermint
make install
ethermintd

cd $HOME
cd ./ethermint
bash init.sh

sudo tee <<EOF >/dev/null /etc/systemd/system/ethermint-rollup.service
[Unit]
Description=Ethermint Rollup For Blockspace Race
After=network-online.target

[Service]
User=$USER
ExecStart=/root/go/bin/ethermintd start --rollkit.aggregator true --rollkit.da_layer celestia --rollkit.da_config='{"base_url":"http://localhost:26659","timeout":60000000000,"gas_limit":6000000,"fee":6000}' --rollkit.namespace_id $(openssl rand -hex 8) --rollkit.da_start_height $(curl https://rpc-blockspacerace.pops.one/block | jq -r '.result.block.header.height')
Restart=on-failure
RestartSec=3
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable ethermint-rollup
sudo systemctl restart ethermint-rollup
systemctl status ethermint-rollup
journalctl -u ethermint-rollup -f
