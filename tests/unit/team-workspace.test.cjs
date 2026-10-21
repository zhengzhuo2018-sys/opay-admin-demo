const { test } = require('node:test');
const assert = require('node:assert/strict');
const data = require(process.env.OPAY_TEAM_TEST_DATA);
const { teamMembers } = require(require('node:path').join(require('node:path').dirname(process.env.OPAY_TEAM_TEST_DATA), 'team-members.js'));

const draft = {
  accountType: 'email', accountId: 'preview.member@example.com', memberName: 'Preview Member',
  bappLogin: true, otpType: 'phone', alternateOtp: '', branch: '1200048495', roles: ['Accounting'],
};

test('role display line wraps do not become invented roles', () => {
  assert.deepEqual(data.memberRoles(teamMembers[4]), ['Payout Operator', 'Payout Authorizer']);
  assert.ok(data.teamRoleOptions.some((role) => role.value === 'Payout Authorizer'));
  assert.ok(!data.teamRoleOptions.some((role) => role.value === 'Authorizer'));
  assert.deepEqual(data.memberRoles(teamMembers[0]), ['Super Admin', 'Admin', 'Employee']);
});

test('branch options are derived from all supplied branch assignments', () => {
  assert.equal(data.teamBranchOptions.length, 5);
  assert.equal(new Set(data.teamBranchOptions.map((branch) => branch.value)).size, 5);
});

test('contacts accept formatted phone numbers and reject malformed values', () => {
  assert.equal(data.validateContact('email', 'preview@example.com'), true);
  assert.equal(data.validateContact('email', 'not-an-email'), false);
  assert.equal(data.validateContact('phone', '+234 (202) 512-1500'), true);
  assert.equal(data.validateContact('phone', 'abc123'), false);
});

test('account normalization does not merge different email addresses', () => {
  assert.notEqual(data.normalizeAccount('first-last@example.com'), data.normalizeAccount('firstlast@example.com'));
  assert.equal(data.normalizeAccount(' First.Last@EXAMPLE.COM '), 'first.last@example.com');
  assert.equal(data.normalizeAccount('+234 (202) 512-1500'), data.normalizeAccount('2342025121500'));
});

test('same account may have different branch assignments, but not duplicates', () => {
  assert.equal(data.isDuplicateMember(teamMembers, '+2342026062300', '1200048495'), true);
  assert.equal(data.isDuplicateMember(teamMembers, '+2342026062300', '1200054076'), false);
});

test('creating a preview member preserves branch and role relationships without mutating fixtures', () => {
  const created = data.createPreviewMember(draft, teamMembers);
  assert.equal(created.key, 'preview-8');
  assert.equal(created.no, 8);
  assert.equal(created.branchName.at(-1), '1200048495');
  assert.deepEqual(created.role, ['Accounting']);
  assert.equal(created.bappLogin, 'Yes');
  assert.equal(created.verification, 'Add');
  assert.equal(teamMembers.length, 7);
  assert.equal('password' in created, false);
});

test('duplicate member creation is rejected', () => {
  const existing = data.createPreviewMember(draft, teamMembers);
  assert.throws(() => data.createPreviewMember({ ...draft, accountId: 'PREVIEW.MEMBER@example.com' }, [...teamMembers, existing]), /already assigned/);
});

test('invalid branch, role and contact data cannot create a preview member', () => {
  for (const change of [
    { branch: 'unknown' }, { roles: [] }, { roles: ['invented-role'] },
    { memberName: '   ' }, { accountId: 'invalid' }, { alternateOtp: 'invalid' },
  ]) assert.throws(() => data.createPreviewMember({ ...draft, ...change }, teamMembers), /review/);
});

test('preview action identifiers are unique and no role policy is inferred', () => {
  assert.equal(data.allPermissionKeys.length, 9);
  assert.equal(new Set(data.allPermissionKeys).size, 9);
  assert.ok(!('defaultPermissions' in data));
});
