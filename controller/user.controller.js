import Zilliqa from "@zilliqa-js/zilliqa";
import bip39 from "bip39";
import crypto from "crypto";
import { axiosRequest } from "../utils/services/axios-request.js";
const zilliqa = new Zilliqa.Zilliqa("https://dev-api.zilliqa.com/");
// import ada from "js-chain-libs/js_chain_libs.js";
const { toBech32Address } = Zilliqa;
import hdkey_1 from "hdkey";

export const createBySeed = async (req, res) => {
  try {
    const randomBytes = crypto.randomBytes(16);
    const mnemonic = bip39.entropyToMnemonic(randomBytes.toString("hex"));
    const mnemonic_to_array = mnemonic.split(" ");
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const hdkey = hdkey_1.fromMasterSeed(seed);
    const childKey = hdkey.derive("m/44'/313'/0'/0/" + 0);
    const privateKey = childKey.privateKey.toString("hex");
    const address = zilliqa.wallet.addByPrivateKey(private_key);
    const bech32 = toBech32Address(address);
    res.status(201).json({
      message: "Account created",
      account: {
        privateKey: privateKey,
        address: address,
        bech32: bech32,
        mnemonic: mnemonic_to_array,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

export const createByPrivateKey = async (req, res) => {
  try {
    const privateKey = Zilliqa.schnorr.generatePrivateKey();
    const address = zilliqa.wallet.addByPrivateKey(privateKey);
    const bech32 = toBech32Address(address);
    res.status(201).json({
      message: "Account created",
      privateKey: privateKey,
      address: address,
      bech32: bech32,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

export const checkBalance = async (req, res) => {
  try {
    const address = req.params.address;
    const balance = await axiosRequest(
      "POST",
      "https://dev-api.zilliqa.com/",
      { id: "1", jsonrpc: "2.0", method: "GetBalance", params: [address] },
      { "Content-Type": "application/json" }
    );
    console.log(balance);
    if (balance?.data?.result) res.status(200).json(balance.data.result);
    else res.status(404).json(balance.data.error.message);
  } catch (error) {
    res.status(500).json("error");
  }
};

// exports.createByPrivate = async (req, res) => {};
