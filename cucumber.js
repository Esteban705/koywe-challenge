module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['test/e2e/steps/*.ts', 'test/e2e/world/*.ts'],
    format: ['@cucumber/pretty-formatter'],
    paths: ['test/e2e/features/'],
  }
}; 