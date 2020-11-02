const LandTransfer = artifacts.require('./LandTransfer.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('LandTransfer', ([deployer, author, receiver]) => {
  let landTransfer

  before(async () => {
    landTransfer = await LandTransfer.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await landTransfer.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

  })

//   describe('reports', async () => {
//     let result, reportCount

//     before(async () => {
//       result = await landTransfer.uploadReport('This is my first report', { from: author }, receiver)
//       reportCount = await landTransfer.reportCount()
//     })

    // it('uploads reports', async () => {
    //   // SUCESS
    //   assert.equal(reportCount, 1)
    //   const event = result.logs[0].args
    //   assert.equal(event.id.toNumber(), reportCount.toNumber(), 'id is correct')
    //   assert.equal(event.ipfsHash, 'This is my first report', 'hash is correct')
    //   assert.equal(event.author, author, 'author is correct')

    //   // FAILURE: Report must have hash
    //   await encryptIPFS.uploadReport('', { from: author }).should.be.rejected;
    // })

    // it('lists reports', async () => {
    //   const report = await encryptIPFS.reports(reportCount)
    //   assert.equal(report.id.toNumber(), reportCount.toNumber(), 'id is correct')
    //   assert.equal(report.ipfsHash, 'This is my first report', 'Hash is correct')
    //   assert.equal(report.author, author, 'author is correct')
    //   assert.equal(report.requester, requester, 'requester is correct')
    // })

//   })

})