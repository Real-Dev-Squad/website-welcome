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
    window.dispatchEvent(event);
    expect(ancTag.click).not.toHaveBeenCalled();
  });
});

test('removes focus for all elements except the target', () => {
  const faqLinks = [
    {
      getAttribute: () => 'link',
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

describe('faqLinks', () => {
  let faqLinks, faqTextSiblingElement, faqExpandIcon, tabIndexing;
  beforeEach(() => {
    document.body.innerHTML = `
    <div class="faq_container">
        <div class="faq_link">
          <div class="faq_expand_icon"></div>
        </div>
        <div class="faq_text"></div>
        <div class="tab_index"></div>
    </div>
    `;
    faqLinks = document.querySelectorAll('.faq_link');
    tabIndexing = document.querySelectorAll('.tab_index');
    faqLinks.forEach((faqLink) => {
      faqTextSiblingElement = faqLink.nextElementSibling;
      faqExpandIcon = faqLink.firstElementChild.lastElementChild;
    });
  });
  test('should toggle tabindex on tabIndexing elements', () => {
    faqLinks.forEach((faqLink) => {
      tabIndexing.forEach((element) => {
        const previousTabIndex = element.getAttribute('tabindex');
        element.setAttribute('tabindex', previousTabIndex == '1' ? '-1' : '1');
      });
    });
  });
});
