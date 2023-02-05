import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

let userToken ;

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });


  /**
	 * Test the register user route
	 * - should register user
   * - should return error when firstname not present (-ve test case)
   * - should return error when firstname length is not coorect (should be >= 4) (-ve test case)
   * - should return error when lastname not present (-ve test case)
   * - should return error route not found when endpoint doesn't matches (-ve test case)
   * - should return error when password length is not correct (should be >= 6 ) (-ve test case)
	 */
  describe('POST /users/', () => {
    it('GivenValidUserDetailsShouldReturnStatusCode201', (done) => {
      const user = {
        firstname: "saswat",
        lastname: "patro",
        email: "saswat@gmail.com",
        password: "saswat12345"
      }
      request(app)
        .post('/api/v1/users/')
        .send(user)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          userId = res.body.userId;
        });
        done();
    });


    it('WhenFirstnameIsNotEnteredShouldReturnStatusCode500', (done) => {
			const user = {
				lastName: "patro",
				email: "saswat@gmail.com",
				password: "saswat12345"
			};
			request(app)
				.post('/api/v1/users/')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
				});
        done();
		});


    it('WhenFirstnameLengthIsNotCorrectlyEnteredShouldReturnStatusCode500', (done) => {
			const user = {
        firstname: "sas",
				lastName: "patro",
        email: "saswat@gmail.com",
				password: "saswat12345"
			};
			request(app)
				.post('/api/v1/users/')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
				});
        done();
		});


    it('WhenLastnameIsNotEnteredShouldReturnStatusCode500', (done) => {
			const user = {
        firstname: "saswat",
        email: "saswat@gmail.com",
				password: "saswat12345"
			};
			request(app)
				.post('/api/v1/users/')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
				});
        done();
		});


    it('WhenEndPointDoesnotMatchShouldReturnStatusCode404', (done) => {
			const user = {
				firstName: "saswat",
				lastName: "patro",
				email: "saswat@gmail.com",
				password: "saswat12345"
			};
			request(app)
				.post('/api/v1/users/registe')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(404);
				});
        done();
		});


    it('WhenPasswordLengthIsNotCorrectlyEnteredShouldReturnStatusCode500', (done) => {
			const user = {
        firstname: "saswat",
				lastName: "patro",
        email: "saswat@gmail.com",
				password: "sasw"
			};
			request(app)
				.post('/api/v1/users/')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
				});
        done();
		});
  });


  /**
	 * Test the user login route
	 * - should login user and return token to be stored in userToken
	 * - should return error when email is not entered
	 * - should return error when email format is not correct
	 * - should return error when password is not entered
	 * - should return error when password length is not correct
	 * - should return error route not found
	 * - should return error for user not found (when wrong email is entered)
	 * - should return error when invalid password is entered
	 */
	describe('POST /users/login', () => {
		it('WhenEnteredValidDetailsShouldReturnStatusCode200', (done) => {
			const user = {
				email: "saswat@gmail.com",
				password: "saswat12345"
			};
			request(app)
				.post('/api/v1/users/login')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(200);
					userToken = res.body.token;	
          	
				});
        done();
		});


		it('WhenEmailIsNotEnteredShouldReturnStatusCode500', (done) => {
			const user = {
				password: "saswat12345"
			};
			request(app)
				.post('/api/v1/users/login')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
				});
        done();
		});


		it('WhenEmailEnteredInWrongFormatShoudlReturnStatusCode500', (done) => {
			const user = {
				email: "saswat",
				password: "saswat12345"
			};
			request(app)
				.post('/api/v1/users/login')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
				});
        done();
		});


		it('WhenPasswordIsNotEnteredShouldReturnStatusCode500', (done) => {
			const user = {
				email: "saswat@gmail.com",
			};
			request(app)
				.post('/api/v1/users/login')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);	
				});
        done();
		});

		it('WhenPasswordLengthIsNotCorrectShouldReturnStatusCode500', (done) => {
			const user = {
				email: "saswat@gmail.com",
				password: "sasw"
			};
			request(app)
				.post('/api/v1/users/login')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
				});
        done();
		});

		it('WhenProperRouteIsNotHitShouldReturnStatusCode404', (done) => {
			const user = {
				firstName: "saswat",
				lastName: "patro",
				email: "saswat@gmail.com",
				password: "saswat12345"
			};
			request(app)
				.post('/api/v1/users/log')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(404);	
				});
        done();
		});

		it('WhenInvalidEmailIsEnteredShouldReturnStatusCode404', (done) => {
			const user = {
				email: "sasw@gmail.com",
				password: "saswat12345"
			};
			request(app)
				.post('/api/v1/users/login')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(404);
				});
        done();
		});

		it('WhenInvalidPasswordIsEnteredShouldReturnStatusCode401', (done) => {
			const user = {
				email: "saswat@gmail.com",
				password: "saswat123456"
			};
			request(app)
				.post('/api/v1/users/login')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(401);	
				});
        done();
		});
	});

});


export {userToken};