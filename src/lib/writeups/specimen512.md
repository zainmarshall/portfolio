---
title: "Specimen 512: The DNA Archive"
description: "Converting DNA codons to base 64, then using binwalk to extract a flag."
date: "2025-12-22"
categories: ["Misc", "Crypto"]
challenge: "Specimen 512"
ctf: "V1t 2025 CTF"
challenge_author: "Shah Ji"
challenge_description: "An unmarked data file was recovered from an abandoned research server labeled only as Specimen 512. No accompanying documentation, no metadata, and no obvious contents — just a massive file filled with strange sequences. Some say it hides a secret."
challenge_files:
  - name: "Specimen_512.fasta"
    link: "#" 
flag: "v1t{30877432d1026706d7e805da846a32c3}"
published: true
---

# Specimen 512: The DNA Archive

This challenge provided a ZIP file containing a FASTA file. A FASTA file is a file containing DNA sequences. The challenge was to decode the DNA sequences to reveal the flag. This was a crypto challenge.

## The File

The fasta file looked like this:
```txt
>DNA_ARCHIVE_sample|size_target_mb=5
; hint: encoding=base64->triplet-codon (lexicographic AAA..TTT => b64 idx 0..63)
; pad_count=2  ; note: base64 padding removed from stream
; gc_hint: some decoy regions have varying GC to confuse simple heuristics
>prelude
CAATCTAGAACTCCAAACGAGTGTCCGCTTGAAGTTCAATTCGTAATAGATCTGACACACATTCGGAAGGATATC...
```

The DNA sequence kept repeating for many pages, but the intresting part was the hint given at the top of the file. 

## Step 1: Base64
From the hint, we can see that the DNA sequence is made up of triplets (condonds), and each of those triplets represents a base64 character. This works because there are 4 DNA bases, and base64 has 64 characters. Having 3 bases allows for encoding $4^3 = 64$ characters. 

I wrote the following python code to convert the DNA sequence to base64 and then decode the base64:
```python
#!/usr/bin/env python3
import base64

def dna_triplet_to_base64_index(triplet):
    """
    Convert a DNA triplet to a base64 index (0-63)
    Using lexicographic ordering: AAA=0, AAC=1, AAG=2, AAT=3, ACA=4, etc.
    Treat as base-4: A=0, C=1, G=2, T=3
    """
    base_map = {'A': 0, 'C': 1, 'G': 2, 'T': 3}
    
    if len(triplet) != 3:
        return None
    
    try:
        index = base_map[triplet[0]] * 16 + base_map[triplet[1]] * 4 + base_map[triplet[2]]
        return index
    except KeyError:
        return None

def decode_dna_to_base64(dna_sequence):
    """Convert DNA sequence to base64 string"""
    base64_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    
    # Remove whitespace and newlines
    dna_sequence = ''.join(dna_sequence.split())
    
    # Process triplets
    base64_string = ""
    for i in range(0, len(dna_sequence), 3):
        triplet = dna_sequence[i:i+3]
        if len(triplet) == 3:
            index = dna_triplet_to_base64_index(triplet)
            if index is not None:
                base64_string += base64_chars[index]
    
    return base64_string

# Read FASTA file 
with open('Specimen_512.fasta', 'r') as f:
    lines = f.readlines()

dna_sequence = ""
skip_next_sequence = False

# Read the DNA sequence
for line in lines:
    line = line.strip()
    
    # Skip the prelude
    if line.startswith(';') or not line:
        continue

    if line.startswith('>'):
        skip_next_sequence = 'prelude' in line.lower()
        continue
    
    if skip_next_sequence:
        continue
    
    dna_sequence += line

# Convert DNA to base64 and add padding
base64_string = decode_dna_to_base64(dna_sequence)
base64_string += "=="  # Add the 2 padding characters


# Decode base64
decoded = base64.b64decode(base64_string)

with open('output.bin', 'wb') as out_file:
    out_file.write(decoded)
```

This code took the FASTA file and decoded it and outputed a binary file. 

## Step 2: Binwalk

Just looking at the `output.bin` file with `grep`, we can see some interesting strings:

```text
❯ grep -a "flag" output.bin

�X`�W����`��a��n��EZPS���������b~������:l��136�&4/iԒ�Q�x0|wj?c5�8c@䩶�#d GԖ�+���E"�`y2џ	�
                                                                                         r���u:�;��a��~��h��dw�,X�ܾ�?����Z�eܡ�-�ku%ݗ��C��T��"R&�O�o����S�B6��M�Զ[<g�)��c��[�mL����.��z{O
                    �G���2�� �2��i=���u��=k�Cv2w��^�H��(�(��r�ֻ�]!��oq��w[k~(����g*����%l���ľ�C��{)՘�t1w�o dQQt��_�c(��B3�x�_YI����b��E
i[�� �w����GeɹO��[4¸��nFKu���Ԧ�yN��)����|7g3���O>
                                              yn�_vc&
���`�1B�                                             �
        �Fp9���y�����qޟ��;}�T��Ļz��$�2�	�k��k����k��r����	��r��X�Ј��w��=�`pHтU��ܯI�5QAČ����b2�7�.��M��PK  yM[�Qt�(flag.txt+3,�66�07716J1402370K1O�00MI�01K46J6��PK     yM[hl��02
readme.txt
          ��,V�D?GǢ�̲T���ʜ��=�̴T��̼�����t=.PK      yM[�Qt�(��flag.txtPK    yM[hl��02
```

We see `flag.txt` and `readme.txt` mentioned along with `PK` headers, which strongly suggests this binary file contains a zip archive.

To extract this zip archive, we can use `binwalk`. Binwalk is a tool to extract polyglot files automatically. Running the command:
```bash
 ❯ binwalk -e output.bin

                        /Users/zain/Developer/ctf/v1t/specimen512/extractions/output.bin
---------------------------------------------------------------------------------------------------------------------
DECIMAL                            HEXADECIMAL                        DESCRIPTION
---------------------------------------------------------------------------------------------------------------------
10000                              0x2710                             ZIP archive, file count: 2, total size: 298 
                                                                      bytes
---------------------------------------------------------------------------------------------------------------------
[+] Extraction of zip data at offset 0x2710 completed successfully
---------------------------------------------------------------------------------------------------------------------

Analyzed 1 file for 85 file signatures (187 magic patterns) in 62.0 milliseconds
```

Binwalk extracted a zip file at the offset `0x2710`.

Opening this zip file, we see two files: `flag.txt` and `readme.txt`.

The readme.txt file contains: `This is a DNA Archive payload. Life finds a flag/`
The flag.txt file contains the flag: `v1t{30877432d1026706d7e805da846a32c3}`

## Summary
This challenge invovled converting DNA codons into base64, then decoding that base64 into a binary, then binwalking the binary to extract a zip file with the flag in it. 