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

it('removes focus for all elements except the target', () => {
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
  const target = faqLinks[0];

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
  let faqLinks, faqExpandIcon, tabIndexing, faqLink, tabindex;
  beforeEach(() => {
    document.body.innerHTML = `
    <div class="faq_container">
        <div class="faq_link">
          <div class="faq_expand_icon"></div>
        </div>
        <div class="faq_text"></div>
        <div class="tabindex"></div>
    </div>
    `;
    faqLinks = document.querySelectorAll('.faq_link');
    tabIndexing = document.querySelectorAll('.tabindex');
    faqLinks = document.querySelectorAll('.faq_link');
    faqExpandIcon = document.querySelector('.faq_expand_icon');
    faqLink = faqLinks[0];
    // faqLink.classList.appendChild(tabindex);
  });
  it('should toggle the show class on faqLink and faqExpandIcon', () => {
    faqLinks.forEach((faqLink) => {
      faqLink.classList.toggle('show');
      faqExpandIcon.classList.toggle('show');
    });
    expect(faqLink.classList.contains('show')).toBe(true);
    expect(faqExpandIcon.classList.contains('show')).toBe(true);
  });
  it('should toggle tabindex on tabIndexing elements', () => {
    faqLinks.forEach((faqLink) => {
      console.log(faqLink, tabIndexing);
      tabIndexing.forEach((element) => {
        console.log(element);
        const previousTabIndex = element.getAttribute('tabindex');
        console.log(previousTabIndex);
        element.setAttribute('tabindex', previousTabIndex == '1' ? '-1' : '1');
      });
      expect(faqLink.classList.contains('tabindex')).toBe(false);
      // expect(tabIndexing[0].getAttribute('tabindex')).toBe('1');
    });
    faqLink.dispatchEvent(new Event('click'));
    tabIndexing.forEach((element) => {
      expect(element.getAttribute('tabindex')).toBe('1');
    });
  });
});
