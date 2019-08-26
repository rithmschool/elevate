const sqlForPartialUpdate = require("../../helpers/partialUpdate")

describe("partialUpdate()", () => {
  it("should generate a proper partial update query",function() {
    let updateCharge = sqlForPartialUpdate(
      'charges',
      {amount: 10000},
      'id',
      '1');
    expect(updateCharge).toEqual({
      query: `UPDATE charges SET amount=$1 WHERE id=$2 RETURNING *`,
      values: [10000, '1']
    });
    
    let updateCharge2 = sqlForPartialUpdate(
      'charges',
      {amount: 500, description: 'Services rendered.', due_date: '2019-08-21'},
      'id',
      '2')
    expect (updateCharge2).toEqual({
      query: `UPDATE charges SET amount=$1, description=$2, due_date=$3 WHERE id=$4 RETURNING *`,
      values: [500, 'Services rendered.', '2019-08-21', '2']
    });
  }
  );
});