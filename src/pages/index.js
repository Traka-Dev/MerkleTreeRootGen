import { useState } from "react"
import { HeadPage } from "../components/HeaderPage"
import { Button, Textarea, Heading } from "@chakra-ui/react"
import { ethers } from "ethers"
import { MerkleTree } from "merkletreejs"
import keccak256 from "keccak256"
import styles from "../styles/Home.module.css"

export default function Home() {
  const [root, setRoot] = useState("")

  /*-- encode Leaf for verification --*/
  const encodeLeaf = address => {
    // Same as `abi.encodePacked` in Solidity
    return ethers.AbiCoder.defaultAbiCoder().encode(["address"], [address])
  }

  /*-- Generate Root for verification --*/
  const generateRoot = async Array => {
    const leafNodes = Array.map(addr => encodeLeaf(addr.toLocaleLowerCase()))
    const merkleTreeHash = new MerkleTree(leafNodes, keccak256, {
      hashLeaves: true,
      sortLeaves: true,
    })

    return merkleTreeHash.getHexRoot()
  }

  const isEthAddress = address => /^0x[a-fA-F0-9]{40}$/.test(address)

  const generate = async () => {
    const textAreaContent = document.getElementById("addresses").value

    // remove white spaces
    let text = textAreaContent.replace(/\s+/g, "")

    // remove quotes
    text = text.replace(/['"]+/g, "")

    // split the string by comma
    const addresses = text.split(",").filter(isEthAddress)

    setRoot(await generateRoot(addresses))
  }

  return (
    <div className={styles.container}>
      <HeadPage
        title="Root Generator"
        description="Website to generate root for your Merkle tree WhiteList"
      />
      <main className={styles.main}>
        <Heading as="h1" size="xl" textAlign={"center"} mb={50}>
          Generate the ROOT for your Merkle Tree
        </Heading>
        <Textarea
          id="addresses"
          className={styles.textArea}
          placeholder='Place your address separated by a , that you want to generate the root example "0x0000", "0x0000" or 0x0000, 0x0000'
        />
        <div className={styles.btnContainer}>
          <Button colorScheme="blue" onClick={generate}>
            Generate
          </Button>
        </div>
        <div>
          <Heading s="h2" size="md" textAlign={"center"} mb={50}>
            {root}
          </Heading>
        </div>
      </main>
    </div>
  )
}
