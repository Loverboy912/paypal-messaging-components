import openModal from '../../utils/initializeModal';
import { viewports, bannerStyles, getGroupString } from '../../utils/testStylesConfig';
import { xClosesModal, closeModalEsc, clickOutsideClosesModal, closeReopenModal } from '../../globalModalTestDefs';
import { clickHereSeeTerms, applyNowBtn, niContentTest } from './us_modalTestDefs';

const account = 'DEV00000000NI';

describe.each([
    [viewports[0], bannerStyles[1]],
    [viewports[1], bannerStyles[1]]
])('US EZP and NI basic modal functionality tests %o', (viewport, bannerStyle) => {
    beforeEach(async () => {
        await openModal(viewport, {
            account,
            style: bannerStyle
        });
    });

    const groupString = getGroupString({ viewport, bannerStyle });

    test(`${groupString} x button closes modal`, xClosesModal({ account, viewport, groupString }));
    test(`${groupString} close modal on escape key press`, closeModalEsc({ account, viewport, groupString }));
    if (viewport.height === 1080) {
        test(
            `${groupString} close modal on click outside`,
            clickOutsideClosesModal({ account, viewport, groupString })
        );
    }
    test(
        `${groupString} after modal close, modal can reopen and close again`,
        closeReopenModal({ account, viewport, groupString })
    );

    test(
        `${groupString} click here inside modal takes user to see terms page`,
        clickHereSeeTerms({ account, viewport, groupString })
    );
    test(
        `${groupString} apply now button opens browser to credit application login`,
        applyNowBtn({ account, viewport, groupString })
    );
    test(
        `${groupString} NI content is loaded when NI message is clicked`,
        niContentTest({ account, viewport, groupString })
    );
});
