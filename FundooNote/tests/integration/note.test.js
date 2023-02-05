import { expect } from 'chai';
import request from 'supertest';
//import { userId } from './user.test';
import { userToken } from './user.test';
import app from '../../src/index';

let createdNote;
//console.log("Message------------------------->", userToken);


describe('Note APIs Test', () => {
    /**
	 * Test the POST note route
	 * - should create note 
	 
	 */
	describe('POST /notes/', () => {
		it('WhenEnteredValidFieldDetailsShouldReturnStatusCode201', (done) => {
			const note = {
				title: "Saswat note",
				description: "Football match today."
			};
			request(app)
				.post('/api/v1/notes')
                .set({Authorization: "bearer "+userToken})
				.send(note)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(201);
					createdNote = res.body.data;			
				});
                done();
		});
    });
});