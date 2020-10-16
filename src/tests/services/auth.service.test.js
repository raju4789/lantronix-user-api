const chai = require("chai");
const sinon = require("sinon");

const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;
chai.should();
const rewire = require("rewire");
const md5 = require("md5");
const authService = rewire("../../services/auth.service");

describe('user service', function () {

    const getDBUserResponse = {
        USER_EXISTS: {
            "username": "raju4789",
            "password": md5("mln1234"),
            "email": "narasimha4789@gmail.com",
            "firstname": "Raju",
            "lastname": "MLN"
        },
        NO_USER_EXISTS: null
    };


    beforeEach(function () {

        const noop = () => { };

        userRepo = {
            getDBUser: sinon.stub()
        };

        logger = {
            info: noop,
            error: noop
        };

        authService.__set__("userRepo", userRepo);
        authService.__set__("logger", logger);
    });

    describe("create user", function () {

        it("should throw an error, if user is not present", function () {
            userRepo.getDBUser.resolves(getDBUserResponse.NO_USER_EXISTS);
            return authService.authenticateUser({ username: 'raju4789' }).should.be.rejectedWith(Error, `Username/Password is incorrect`);
        });

        it("should throw an error, if password is incorrect", function () {
            userRepo.getDBUser.resolves(getDBUserResponse.USER_EXISTS);
            return authService.authenticateUser({ username: 'raju4789', password: 'mln12345' }).should.be.rejectedWith(Error, `Username/Password is incorrect`);
        });

        it("should return access token along with user", async () => {
            userRepo.getDBUser.resolves(getDBUserResponse.USER_EXISTS);

            const response = await authService.authenticateUser({
                "username": "raju4789",
                "password": "mln1234",
                "email": "narasimha4789@gmail.com",
                "firstname": "Raju",
                "lastname": "MLN"
            });

            expect(response.token).to.not.eql(null);
            expect(response.user.password).to.eql(undefined);


        });
    });

});
8