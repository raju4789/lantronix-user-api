const chai = require("chai");
const sinon = require("sinon");

const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;
chai.should();
const rewire = require("rewire");
const md5 = require("md5");
const userService = rewire("../../services/user.service");

describe('user service', function () {

    const getDBUserResponse = {
        USER_EXISTS: {
            "username": "raju4789",
            "password": "mln1234",
            "email": "narasimha4789@gmail.com",
            "firstname": "Raju",
            "lastname": "MLN"
        },
        NO_USER_EXISTS: null
    };

    const addUserResponse = {
        SUCCESS: {
            "_id": "12345",
            "username": "raju4789",
            "password": "mln1234",
            "email": "narasimha4789@gmail.com",
            "firstname": "Raju",
            "lastname": "MLN"
        }
    };


    beforeEach(function () {

        const noop = () => { };

        userRepo = {
            getDBUser: sinon.stub(),
            addUser: sinon.stub()
        };

        logger = {
            info: noop,
            error: noop
        };

        userService.__set__("userRepo", userRepo);
        userService.__set__("logger", logger);
    });

    describe("create user", function () {

        it("should throw an error, if user already exists", function () {
            userRepo.getDBUser.resolves(getDBUserResponse.USER_EXISTS);
            return userService.createUser({ username: 'raju4789' }).should.be.rejectedWith(Error, `User already exists with username: raju4789`);
        });

        it("should throw an error, if addUser call fails", function () {
            userRepo.getDBUser.resolves(getDBUserResponse.NO_USER_EXISTS);
            userRepo.addUser.rejects();
            return userService.createUser({ username: 'raju4789' }).should.be.rejectedWith(Error);
        });

        it("should return added user is operation is successfull", async function () {
            userRepo.getDBUser.resolves(getDBUserResponse.NO_USER_EXISTS);
            userRepo.addUser.resolves(addUserResponse.SUCCESS);
            const user = await userService.createUser({
                "username": "raju4789",
                "password": "mln1234",
                "email": "narasimha4789@gmail.com",
                "firstname": "Raju",
                "lastname": "MLN"
            });

            expect(user.username).to.equal("raju4789");

        });
    });

});
