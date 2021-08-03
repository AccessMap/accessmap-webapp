import React from "react";

import Button from "react-md/src/js/Buttons";
import DataTable, { TableBody } from "react-md/src/js/DataTables";
import SVGIcon from "react-md/src/js/SVGIcons";

import LinkModal from "./LinkModal";
import ContentRow from "./ContentRow";

import email from "icons/email.svg";
import twitter from "icons/twitter.svg";

interface Props {
  onClose(): void;
}

const ContactLinkModal = ({ onClose }: Props) => (
  <LinkModal title="Contact" onClose={onClose}>
    <DataTable plain responsive>
      <TableBody>
        <ContentRow
          buttons={
            <Button
              icon
              svg
              href="https://twitter.com/accessmapsea"
              target="_blank"
            >
              <SVGIcon use={twitter.url} />
            </Button>
          }
          label={"Follow us on social media."}
        />
        <ContentRow
          buttons={
            <Button icon svg href="mailto:accessmap.info@gmail.com">
              <SVGIcon use={email.url} />
            </Button>
          }
          label="Email us if you encounter issues or want to help out"
        />
      </TableBody>
    </DataTable>
  </LinkModal>
);

export default ContactLinkModal;
