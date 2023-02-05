import { expect } from 'chai';
import request from 'supertest';
//import { userId } from './user.test';
import { userToken } from './user.test';
import app from '../../src/index';

let createdNote;
//const wrongToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGEzNTc1OGZkYTQ1M2VmODI2YzQzNyIsImVtYWlsIjoic3JpdGFtQGdtYWlsLmNvbSIsImlhdCI6MTY3NTU3NjEyM30.6Qqze9DpxXJwKSSmKBmLcUGcQnI98vg7kPm8Eog3M1E";
//const wrongNoteId = "63c922898f37bb601c2a965a";
//let updatedNote;
console.log("Message------------------------->", userToken);
describe('Note APIs Test', () => {
    /**
	 * Test the POST note route
	 * - should create note 
	 * - should return error when title is not entered
	 * - should return error when title length is not proper
	 * - should return error when description is not entered
	 * - should create note and return error for description length
	 * - should create note and return error for authorization
	 * - should create note and return error for invalid token
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