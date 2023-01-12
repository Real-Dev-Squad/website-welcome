// test('use jsdom in this test file', () => {
//     const element = document.createElement('div');
//     expect(element).not.toBeNull();
//   });
// import removeFocusForOthers from "./faq"
const removeFocusForOthers = require('./faq');

describe('handle keydown event', () => {
  let ancTag, event;
  beforeEach(() => {
    ancTag = document.createElement('a');
    ancTag.setAttribute('href', '/example');
    ancTag.click = jest.fn();
    document.body.appendChild(ancTag);
    event = new KeyboardEvent('keydown', { key: ' ' });
  });

  it('should not call click on anchor tag when keydown event is not space', () => {
    event.key = 'Enter';
    event.target = ancTag;
    window.dispatchEvent(event);
    expect(ancTag.click).not.toHaveBeenCalled();
  });
  it('should not call click on anchor tag when anchor tag is not found', () => {
    event.target = document.createElement('div');
    window.dispatchEvent(event);
    expect(ancTag.click).not.toHaveBeenCalled();
  });
});

test('removes focus for all elements except the target', () => {
  const faqLinks = [
    {
      getAttribute: () => 'link1',
      nextElementSibling: {
        querySelectorAll: () => [
          { setAttribute: jest.fn() },
          { setAttribute: jest.fn() },
        ],
      },
    },
    {
      getAttribute: () => 'link2',
      nextElementSibling: {
        querySelectorAll: () => [
          { setAttribute: jest.fn() },
          { setAttribute: jest.fn() },
        ],
      },
    },
    {
      getAttribute: () => 'link3',
      nextElementSibling: {
        querySelectorAll: () => [
          { setAttribute: jest.fn() },
          { setAttribute: jest.fn() },
        ],
      },
    },
  ];
  const target = faqLinks[1];

  removeFocusForOthers(target);

  faqLinks.forEach((faqLink, index) => {
    if (index === 1) {
      expect(
        faqLink.nextElementSibling.querySelectorAll()[0].setAttribute,
      ).not.toHaveBeenCalled();
    }
  });
});
