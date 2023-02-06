import removeFocusForOthers from './faq';
import { describe, expect, it, jest } from '@jest/globals';

describe('handle keydown event', () => {
  let ancTag, event, spy;
  beforeEach(() => {
    ancTag = document.createElement('a');
    spy = jest.spyOn(document, 'querySelector').mockReturnValue(ancTag);
    ancTag.setAttribute('href', '/example');
    ancTag.click = jest.fn();
    document.body.appendChild(ancTag);
    event = { key: ' ', preventDefault: jest.fn() };
  });

  afterEach(() => {
    spy.mockRestore();
  });

  it('should not call preventDefault and ancTag.click method  when key is not space', () => {
    event.key = 'Enter';
    window.addEventListener('keydown', event);
    expect(event.preventDefault).not.toHaveBeenCalled();
  });
  it('should not call preventDefault and ancTag.click method', () => {
    window.addEventListener('keydown', event);
    expect(event.preventDefault).not.toHaveBeenCalled();
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
    if (index === 0) {
      expect(
        faqLink.nextElementSibling.querySelectorAll()[0].setAttribute,
      ).not.toHaveBeenCalled();
    }
  });
});

describe('faqLinks', () => {
  let faqLinks, faqExpandIcon, tabIndexing, faqLink;
  beforeEach(() => {
    document.body.innerHTML = `
    <div class="faq_container">
        <div class="faq_link tabindex">
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
      tabIndexing.forEach((element) => {
        const previousTabIndex = element.getAttribute('tabindex');
        element.setAttribute('tabindex', previousTabIndex == '1' ? '-1' : '1');
      });
      expect(faqLink.classList.contains('tabindex')).toBe(true);
      expect(tabIndexing[0].getAttribute('tabindex')).toBe('1');
    });
  });
});
